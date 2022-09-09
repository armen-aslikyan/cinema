import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CinemaEntity } from "./cinema.entity";
import { CategoryEntity } from "../../category/entity/category.entity";
import { JoinColumn } from "typeorm";

@Entity("category_cinema")
export class CategoryCinemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CinemaEntity,(cinemaEntity) => cinemaEntity.cinema)
  @JoinColumn({name: 'cinema_id'})
  cinema: CinemaEntity;

  @Column()
  cinema_id: number;

  @ManyToOne(() => CategoryEntity,(categoryEntity) => categoryEntity.category)
  @JoinColumn({name: 'category_id'})
  category: CategoryEntity;

  @Column()
  category_id: number;
}