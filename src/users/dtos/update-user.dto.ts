import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional() // 런타임에서 값이 없으면 검증 스킵
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
