import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryFilterDto {
  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
