import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { UserService } from './user.service';
import { debug } from 'console';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@GetUser() user: User) {
    debug(user);
    //const user = await this.userService.findOne(id);
  }
}
