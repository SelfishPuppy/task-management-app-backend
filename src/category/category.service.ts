import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { debug } from 'console';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    user: User,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.prismaService.category.create({
        data: { userId: user.id, ...createCategoryDto },
      });
      return category;
    } catch (error) {
      debug(error);
    }
  }

  async findAll(user: User): Promise<Category[]> {
    try {
      const categories = await this.prismaService.category.findMany({
        where: { userId: user.id },
      });
      return categories;
    } catch (error) {
      debug(error);
    }
  }

  async findOne(user: User, id: number): Promise<Category> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          userId: user.id,
          id,
        },
      });
      return category;
    } catch (error) {
      debug(error);
    }
  }

  async update(user: User, id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prismaService.category.update({
        where: {
          userId: user.id,
          id,
        },
        data: { ...updateCategoryDto },
      });

      return category;
    } catch (error) {
      debug(error);
    }
  }

  async remove(user: User, id: number) {
    try {
      const category = await this.prismaService.category.delete({
        where: { userId: user.id, id },
      });

      return category;
    } catch (error) {}
  }
}
