import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import * as dotenv from 'dotenv';
// import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from './shared/errorHandler';
dotenv.config();
@Module({
  imports: [AuthModule, TasksModule, DatabaseModule],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   },
  // ],
})
export class AppModule {}
