import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';

// This file contains the CRUD for user
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { username, password } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    const newUser = await this.usersRepository.save(user);

    delete newUser.password;

    return newUser;
  }

  async findMany(dto: FindUsersDto) {
    return this.usersRepository.createQueryBuilder('user').getMany();
  }

  async findOne(
    id: number,
    selectSecrets: boolean = false,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        password: selectSecrets,
      },
    });
  }

  async findByUsername(
    username: string,
    selectSecrets: boolean = false,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: selectSecrets,
      },
    });
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
