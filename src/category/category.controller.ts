import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(201)
  @Post()
  async create(
    @GetUser() user: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.create(user, createCategoryDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.categoryService.findAll(user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.categoryService.findOne(user, +id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(user, +id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.categoryService.remove(user, +id);
  }
}
