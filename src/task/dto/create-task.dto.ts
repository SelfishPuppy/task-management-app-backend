import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
