import { CinemaEntity } from "./entity/cinema.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CinemaDto } from "./dto/cinema.dto";
import { CategoryCinemaEntity } from "./entity/category_cinema.entity";
import { UserCinemaEntity } from "./entity/user_cinema.entity";

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

  async getAllCinema(cinema: boolean, currentUser) {
    if (!cinema) {
      return await this.userCinemaRepo.find({ relations: ["cinema"] });
    }
    return await this.userCinemaRepo.find({
      where: {
        user_id: currentUser.user.id
      },
      relations: ["cinema"]
    });
  }

  async pagination(page: number, limit: number): Promise<any> {
    const pagination: IPagination = {
      page: Number(page || 1),
      limit: Number(limit || 15),
    };
    const skippedItems = (pagination.page - 1) * pagination.limit;
    const queryBuilder = `select * from user_cinema GROUP BY id ORDER BY id ASC LIMIT ${pagination.limit} OFFSET ${skippedItems}`;
    const cinema = await this.userCinemaRepo.query(queryBuilder);
    return {
      cinema,
    };
  }
}