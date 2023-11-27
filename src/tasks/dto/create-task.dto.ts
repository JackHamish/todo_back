import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  @Max(10)
  @Min(1)
  priority: number;
}
