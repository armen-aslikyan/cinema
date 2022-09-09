import { Module } from "@nestjs/common";
import { CinemaService } from "./cinema.service";
import { CinemaController } from "./cinema.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CinemaEntity } from "./entity/cinema.entity";
import { CategoryCinemaEntity } from "./entity/category_cinema.entity";
import { UserCinemaEntity } from "./entity/user_cinema.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CinemaEntity,
      CategoryCinemaEntity,
      UserCinemaEntity
    ]),
  ],
  providers: [CinemaService],
  controllers: [CinemaController],
  exports: []
})

export class CinemaModule{}