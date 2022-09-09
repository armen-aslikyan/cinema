import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserDto } from "./dto/user.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { RegisterDto } from "../auth/dto/register.dto";
import { LoginDto } from "../auth/dto/login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {
  }


  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    const userEntity = await this.userRepo.findOne({
      where: {
        email: email
      }
    });
    if (userEntity) {
      return plainToInstance(UserDto, userEntity);
    }
  }

  async createUser(payload: RegisterDto) {
    payload.password = bcrypt.hashSync(payload.password, 10);
    const user = await this.userRepo.create(payload);
    const userEntity = await this.userRepo.save(user);
    return plainToInstance(UserDto, userEntity, { excludeExtraneousValues: true });
  }

  async signIn(payload: LoginDto) {
    const userEntity = await this.userRepo.findOne({
      where: {
        email: payload.email
      }
    });
    const checkPass = bcrypt.compareSync(payload.password, userEntity.password);
    if (!checkPass) {
      throw new BadRequestException("invalid password");
    }
    return plainToInstance(UserDto, userEntity, { excludeExtraneousValues: true });
  }
}