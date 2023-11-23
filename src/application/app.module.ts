import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './schemas/env.schema';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
