import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Match } from "../../../decorator/confirmPassword.decorator";

export class RegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/, {
    message:
      "Password should contain minimum eight characters, at least one letter, one number and one special character"
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password',{message: 'Password do not match!'})
  confirmPass: string;
}
