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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  CreateTaskDto,
  EndTaskDto,
  StartTaskDto,
  UpdateTaskDto,
  UserInfo,
} from './dto';
import { MongoExceptionFilter } from 'src/shared/errorHandler';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@UseFilters(MongoExceptionFilter)
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
  searchTasks(@Req() req: Request, @Query('value') value: string) {
    const user = req.user;
    return this.tasksService.searchTasksFilter(user as UserInfo, value);
  }

  @Patch('/start-task/:id')
  startTask(@Param('id') id: string, @Body() startTask: StartTaskDto) {
    return this.tasksService.startTask(id, startTask);
  }

  @Patch('/end-task/:id')
  endTask(@Param('id') id: string, @Body() endTask: EndTaskDto) {
    return this.tasksService.endTask(id, endTask);
  }
}
