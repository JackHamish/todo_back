import { ToDoStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsEnum(ToDoStatus)
  status: ToDoStatus;
}
