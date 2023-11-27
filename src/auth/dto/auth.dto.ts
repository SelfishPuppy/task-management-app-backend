import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// User dto used for registration
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
