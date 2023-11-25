import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './schemas/env.schema';
import { TasksModule } from 'src/Tasks/Tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
