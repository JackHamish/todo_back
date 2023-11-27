import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryFilterDto } from 'src/tasks/dto/query.filter.dto';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const duplicate = await this.prismaService.task.findUnique({
      where: { title: createTaskDto.title },
    });

    if (duplicate) {
      throw new BadRequestException('Task with this title already exist');
    }

    return await this.prismaService.task.create({ data: createTaskDto });
  }

  async findAll(queryFilter: QueryFilterDto): Promise<Task[]> {
    const options: Prisma.TaskFindManyArgs = {};

    if (queryFilter.sortField && queryFilter.sortOrder) {
      options.orderBy = {
        [queryFilter.sortField]: queryFilter.sortOrder.toLowerCase(),
      };
    }

    if (queryFilter.title) {
      options.where = {
        title: {
          contains: queryFilter.title,
        },
      };
    }

    if (queryFilter.status) {
      options.where = {
        status: queryFilter.status,
      };
    }

    return await this.prismaService.task.findMany(options);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.ensureTaskExists(id);

    return await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string): Promise<Task> {
    await this.ensureTaskExists(id);

    return await this.prismaService.task.delete({ where: { id } });
  }

  private async ensureTaskExists(id: string): Promise<void> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task is not found');
    }
  }
}
