import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './entity/database.module';
import { TodosController } from './controller/todos.controller';
import { TodosService } from './service/todos.service';
import Todo from './entity/todos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), ConfigModule.forRoot({
    envFilePath: '.env',
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
    }),
  }),
  DatabaseModule,
],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
