import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  // 외부에 노출 할 필드
  @Expose()
  id: number;

  @Expose()
  email: string;

  // 외부에 노출 하지 않을 필드
  //   @Exclude()
  //   password: string;
}
