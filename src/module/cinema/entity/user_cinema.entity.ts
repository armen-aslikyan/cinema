import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { CinemaEntity } from "./cinema.entity";

@Entity("user_cinema")
export class UserCinemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.user)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  user_id: number;

  @ManyToOne(() => CinemaEntity,(cinemaEntity) => cinemaEntity.userCinema)
  @JoinColumn({name: 'cinema_id'})
  cinema: CinemaEntity;

  @Column()
  cinema_id: number;
}