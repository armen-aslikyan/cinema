import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryCinemaEntity } from "../../cinema/entity/category_cinema.entity";

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CategoryCinemaEntity,(categoryCinemaEntity) => categoryCinemaEntity.category)
  category: CategoryCinemaEntity[];
}