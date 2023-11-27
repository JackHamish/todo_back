import { TaskStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
