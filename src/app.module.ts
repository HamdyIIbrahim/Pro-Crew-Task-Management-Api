import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [AuthModule, TasksModule, DatabaseModule],
})
export class AppModule {}
