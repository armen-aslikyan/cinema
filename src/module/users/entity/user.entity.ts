import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryCinemaEntity } from "../../cinema/entity/category_cinema.entity";
import { UserCinemaEntity } from "../../cinema/entity/user_cinema.entity";

@Entity({
  name: "users"
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 500 })
  balance: number;

  @OneToMany(() => UserCinemaEntity,(userCinemaEntity) => userCinemaEntity.user)
  user: UserCinemaEntity[];
}