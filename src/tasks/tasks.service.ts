import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto, UserInfo } from './dto';

@Injectable()
export class TasksService {
  constructor(@Inject('TASK_MODEL') private taskModel: Model<Task>) {}

  async getUserTasks(user: UserInfo) {
    const tasks = await this.taskModel.find({
      user: user.id,
    });
    return { tasks };
  }

  async createTask(user: UserInfo, dto: CreateTaskDto) {
    console.log(dto);
    const task = await this.taskModel.create({
      user: user.id,
      ...dto,
    });
    return { message: 'Task created successfully', task };
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      {
        ...dto,
      },
      { new: true },
    );
    return {
      message: 'Task updated successfully',
      task: updatedTask,
    };
  }

  async deleteTask(id: string) {
    await this.taskModel.findOneAndDelete({ _id: id });
    return { message: 'Task deleted successfully' };
  }

  async searchTasksByTitle(user: UserInfo, title: string) {
    const task = await this.taskModel.find({
      $text: { $search: title },
      user: user.id,
    });
    return { task };
  }
}
