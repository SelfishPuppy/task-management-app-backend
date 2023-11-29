import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { debug } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: User) {
    try {
      const tasks = await this.prismaService.task.findMany({
        where: { userId: user.id },
      });

      return tasks;
    } catch (error) {
      debug(error);
    }
  }

  async findOne(user: User, id: number) {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { userId: user.id, id },
      });

      return task;
    } catch (error) {
      debug(error);
    }
  }

  async create(user: User, dto: CreateTaskDto) {
    try {
      const task = await this.prismaService.task.create({
        data: { userId: user.id, ...dto },
      });

      return task;
    } catch (error) {
      debug(error);
    }
  }

  async update(user: User, id: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prismaService.task.update({
        where: { userId: user.id, id },
        data: { ...dto },
      });

      return task;
    } catch (error) {
      debug(error);
    }
  }

  async remove(user: User, id: number) {
    try {
      const task = await this.prismaService.task.delete({
        where: { userId: user.id, id },
      });

      return task;
    } catch (error) {
      debug(error);
    }
  }
}
