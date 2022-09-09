import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { JwtStrategy } from "../../guard/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions: {
        algorithm: "HS256"
      }
    }),
    UserModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {
}