import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("register")
  async Register(
    @Body() payload: RegisterDto
  ) {
    return this.authService.Register(payload);
  }

  @Post("login")
  async Login(
    @Body() payload: LoginDto
  ) {
    return this.authService.Login(payload);
  }
}