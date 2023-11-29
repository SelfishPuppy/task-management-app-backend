import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@GetUser() user: User) {
    return this.taskService.findAll(user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, id: string) {
    return this.taskService.findOne(user, +id);
  }

  @Post()
  create(@GetUser() user: User, dto: CreateTaskDto) {
    return this.taskService.create(user, dto);
  }

  @Patch(':id')
  update(@GetUser() user: User, id: string, dto: UpdateTaskDto) {
    return this.taskService.update(user, +id, dto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, id: string) {
    return this.taskService.remove(user, +id);
  }
}
