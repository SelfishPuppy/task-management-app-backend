import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTagDto, UpdateTagDto } from './dto';
import { TagService } from './tag.service';

@UseGuards(JwtGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@GetUser() user: User, dto: CreateTagDto) {
    return this.tagService.create(user, dto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.tagService.findAll(user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, id: string) {
    return this.tagService.findOne(user, +id);
  }

  @Patch(':id')
  update(@GetUser() user: User, id: string, dto: UpdateTagDto) {
    return this.tagService.update(user, +id, dto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, id: string) {
    return this.tagService.remove(user, +id);
  }
}
