import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { UserService } from './user.service';
import { debug } from 'console';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(@GetUser() user: User, dto: UpdateUserDto) {
    await this.userService.update(user, dto);
    return { message: 'User updated' };
  }

  @Delete()
  async remove(@GetUser() user: User) {
    await this.userService.remove(user);
    return { message: 'User successfully deleted' };
  }
}
