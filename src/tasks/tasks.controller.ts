import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateTaskDto, UpdateTaskDto, UserInfo } from './dto';
import { Task } from './schemas/task.schema';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getAllTasks(@Req() req: Request) {
    const user = req.user;
    return this.tasksService.getUserTasks(user as UserInfo);
  }

  @Post('/')
  addNewTask(@Req() req: Request, @Body() dto: CreateTaskDto) {
    const user = req.user;
    return this.tasksService.createTask(user as UserInfo, dto);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('/search')
  searchTasks(@Req() req: Request, @Query('title') title: string) {
    const user = req.user;
    return this.tasksService.searchTasksByTitle(user as UserInfo, title);
  }

  @Patch('/start-task/:id')
  startTask(@Param('id') id: string) {
    return this.tasksService.startTask(id);
  }
}
