import { CinemaEntity } from "./entity/cinema.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CinemaDto } from "./dto/cinema.dto";
import { CategoryCinemaEntity } from "./entity/category_cinema.entity";
import { UserCinemaEntity } from "./entity/user_cinema.entity";
import { CinemaPageOptionsDto } from "./dto/cinemaPageOptions.dto";

export interface IPagination {
  page: number;
  limit: number;
}

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepo: Repository<CinemaEntity>,
    @InjectRepository(CategoryCinemaEntity)
    private readonly categoryCinemaRepo: Repository<CategoryCinemaEntity>,
    @InjectRepository(UserCinemaEntity)
    private readonly userCinemaRepo: Repository<UserCinemaEntity>
  ) {
  }

  async addCinema(payload: CinemaDto): Promise<{ message: string }> {
    try {
      const cinema = await this.cinemaRepo.create(payload);
      await this.cinemaRepo.save(cinema);
      await this.categoryCinemaRepo.save({
        cinema_id: cinema.id,
        category_id: payload.categoryId
      });
      return {
        message: "Success"
      };
    } catch (error) {
      throw new NotFoundException("Category ID is not found");
    }
  }

  async buyCinema(id: number, currentUser) {
    const userCinemaEntity = this.userCinemaRepo.create({
      user_id: currentUser.user.id,
      cinema_id: id
    });
    await this.userCinemaRepo.save(userCinemaEntity);
  }

  async getCinema(payload: CinemaPageOptionsDto, currentUser) {
    const pagination: IPagination = {
      page: Number(payload.page || 1),
      limit: Number(payload.limit || 15)
    };
    const skippedItems = (pagination.page - 1) * pagination.limit;
    if (!payload.purchased) {
      return await this.categoryCinemaRepo.find({
        relations: ["cinema", "category"],
        order: {
          id: "ASC"
        },
        skip: skippedItems,
        take: pagination.limit
      });
    }
    if (payload.takeAll) {
      return await this.categoryCinemaRepo.find({
        relations: ["cinema", "category"],
        order: {
          id: "ASC"
        },
        skip: skippedItems,
        take: pagination.limit
      });
    }
    return this.userCinemaRepo.find({
      where: {
        user_id: currentUser.user
      },
      relations: ["cinema"],
      order: {
        id: "ASC"
      },
      skip: skippedItems,
      take: pagination.limit
    });
  }
}