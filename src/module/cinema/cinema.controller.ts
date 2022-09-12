import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CinemaService } from "./cinema.service";
import { CinemaDto } from "./dto/cinema.dto";
import { CurrentUser } from "../../decorator/currentUser.decorator";
import { JwtAuthGuard } from "../../guard/jwt.authGurad";
import { CinemaPageOptionsDto } from "./dto/cinemaPageOptions.dto";

@Controller("cinema")
export class CinemaController {
  constructor(
    private readonly cinemaService: CinemaService
  ) {
  }

  @Post("add")
  async addCinema(
    @Body() payload: CinemaDto
  ) {
    return this.cinemaService.addCinema(payload);
  }

  @Post("buy/:id")
  @UseGuards(JwtAuthGuard)
  async buyCinema(
    @Param("id") id: number,
    @CurrentUser() currentUser
  ) {
    return this.cinemaService.buyCinema(id, currentUser);
  }

  @Get("get-cinema")
  @UseGuards(JwtAuthGuard)
  async getCinema(
    @Query() payload: CinemaPageOptionsDto,
    @CurrentUser() currentUser
  ) {
    return this.cinemaService.getCinema(payload, currentUser);
  }
}