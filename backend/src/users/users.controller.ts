import { Controller, Get, Query } from '@nestjs/common';
import { FindUsersDto } from './dto/find-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findMany(@Query() query: FindUsersDto) {
    return this.usersService.findMany(query);
  }
}
