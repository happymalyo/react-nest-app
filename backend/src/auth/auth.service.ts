import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginDto) {
    const user = await this.usersService.findByUsername(username, true);
    if (!user) {
      return null;
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }
    } catch (error) {
      return null;
    }

    delete user.password;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<User> {
    // Fetch the user by their ID
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Update only the properties that are provided in the DTO
    const updatedUser = Object.assign(user, updateAuthDto);

    // Save the updated user back to the database
    return this.usersService.save(updatedUser);
  }
}
