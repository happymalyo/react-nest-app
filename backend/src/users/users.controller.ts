import { Controller, Get, Query } from '@nestjs/common';
import { FindUsersDto } from './dto/find-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findMany(@Query() query: FindUsersDto) {
    return this.usersService.findMany(query);
  }
}
