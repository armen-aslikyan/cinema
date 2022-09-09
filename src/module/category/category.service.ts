import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entity/category.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {
  }

  async addCategory(payload: CategoryDto): Promise<{ message: string }> {
    const category = await this.categoryRepo.create(payload);
    await this.categoryRepo.save(category);
    return {
      message: "Success"
    };
  }
}