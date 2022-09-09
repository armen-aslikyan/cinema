import { Body, Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("category")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @Post("add")
  async addCategory(
    @Body() payload: CategoryDto
  ) {
    return this.categoryService.addCategory(payload);
  }
}