import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryFilterDto } from 'src/todos/dto/query.filter.dto';
import { Prisma, ToDo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<ToDo> {
    return await this.prismaService.toDo.create({ data: createTodoDto });
  }

  async findAll(queryFilter: QueryFilterDto): Promise<ToDo[]> {
    const options: Prisma.ToDoFindManyArgs = {};

    if (queryFilter.sortField && queryFilter.sortOrder) {
      options.orderBy = {
        [queryFilter.sortField]: queryFilter.sortOrder,
      };
    }

    if (queryFilter.title) {
      options.where = {
        title: {
          startsWith: queryFilter.title,
        },
      };
    }

    if (queryFilter.status) {
      options.where = {
        status: queryFilter.status,
      };
    }

    return await this.prismaService.toDo.findMany(options);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<ToDo> {
    await this.findOne(id);

    return await this.prismaService.toDo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string): Promise<ToDo> {
    await this.findOne(id);

    return await this.prismaService.toDo.delete({ where: { id } });
  }

  private async findOne(id: string): Promise<void> {
    const toDo = await this.prismaService.toDo.findUnique({ where: { id } });

    if (!toDo) {
      throw new NotFoundException('Todo is not found');
    }
  }
}
