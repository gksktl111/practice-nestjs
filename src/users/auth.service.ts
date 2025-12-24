import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 사용중인 이메일인지 확인
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    // 비밀번호 솔트 생성
    const salt = randomBytes(8).toString('hex');

    // 비밀번호 암호화
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 해쉬와 솔트를 합친다
    const result = salt + '.' + hash.toString('hex');

    // 사용자 생성해서 저장하기
    const user = this.usersService.create(email, result);

    // 유저 리턴하기
    return user;
  }

  async signin(email: string, password: string) {
    // 존재하는 이메일인지 확인
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // 패스워드 확인
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 유저 리턴하기
    if (storedHash === hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('invalid credentials');
    }
  }
}
