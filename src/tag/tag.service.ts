import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { User } from '@prisma/client';
import { debug } from 'console';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User, dto: CreateTagDto) {
    try {
      const tag = await this.prismaService.tag.create({
        data: { userId: user.id, ...dto },
      });

      return tag;
    } catch (error) {
      debug(error);
    }
  }

  async findAll(user: User) {
    try {
      const tags = await this.prismaService.tag.findMany({
        where: { userId: user.id },
      });

      return tags;
    } catch (error) {
      debug(error);
    }
  }

  async findOne(user: User, id: number) {
    try {
      const tag = await this.prismaService.tag.findUnique({
        where: { userId: user.id, id },
      });

      return tag;
    } catch (error) {
      debug(error);
    }
  }

  async update(user: User, id: number, dto: UpdateTagDto) {
    try {
      const tag = await this.prismaService.tag.update({
        where: { userId: user.id, id },
        data: { ...dto },
      });

      return tag;
    } catch (error) {
      debug(error);
    }
  }

  async remove(user: User, id: number) {
    try {
      const tag = await this.prismaService.tag.delete({
        where: { userId: user.id, id },
      });
    } catch (error) {
      debug(error);
    }
  }
}
