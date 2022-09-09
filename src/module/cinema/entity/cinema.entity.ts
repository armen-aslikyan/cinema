import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryCinemaEntity } from "./category_cinema.entity";
import { UserCinemaEntity } from "./user_cinema.entity";

@Entity('cinema')
export class CinemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @OneToMany(() => CategoryCinemaEntity,(categoryCinemaEntity) => categoryCinemaEntity.cinema)
  cinema: CategoryCinemaEntity[];

  @OneToMany(() => UserCinemaEntity,(userCinemaEntity) => userCinemaEntity.cinema)
  userCinema: UserCinemaEntity[];
}