import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  async Register(payload): Promise<UserDto> {
    const getUser = await this.userService.findOneByEmail(payload.email);
    if (getUser) {
      throw new HttpException("User is exist", 400);
    }
    return this.userService.createUser(payload);
  }

  async Login(payload) {
    const getUser = await this.userService.signIn(payload);
    if (!getUser) {
      throw new HttpException("User not found", 400);
    }
    const token = this.JwtService.sign({user: getUser.id});
    return {
      message: "Success",
      data: {
        token: token
      }
    };
  }
}