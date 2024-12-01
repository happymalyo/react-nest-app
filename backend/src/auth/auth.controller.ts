import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

// This file handles the authentications
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Express.Request & { user: any }) {
    return this.authService.login(req.user);
  }

  // make the register public
  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByUsername(body.username);
    if (existingUser) {
      throw new BadRequestException('Utilisateur existe déjà');
    }
    const user = await this.usersService.create(body);
    return user;
  }
}
