import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryFilterDto {
  @IsString()
  @IsOptional()
  public sortField?: string;

  @IsString()
  @IsOptional()
  public sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsString()
  @IsOptional()
  public title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
