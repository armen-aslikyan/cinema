import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "./config/typeorm.config";
import { UserModule } from "./module/users/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { CinemaModule } from "./module/cinema/cinema.module";
import { CategoryModule } from "./module/category/category.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    CinemaModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
