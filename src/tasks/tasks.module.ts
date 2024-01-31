import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './schemas/task.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TasksService, ...tasksProviders],
  controllers: [TasksController],
})
export class TasksModule {}
