import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CinemaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;
}