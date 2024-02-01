import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task, taskStatus } from './schemas/task.schema';
import {
  CreateTaskDto,
  EndTaskDto,
  StartTaskDto,
  TaskData,
  UpdateTaskDto,
  UserInfo,
} from './dto';

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

  async startTask(id: string, startTask: StartTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(
      { _id: id },
      {
        clockIn: new Date(startTask.clockIn),
        status: taskStatus.INPROGRESS,
      },
    );
    if (!task) {
      return { message: 'Task not found' };
    }
    return { message: 'Task started', task };
  }

  async endTask(id: string, endTask: EndTaskDto) {
    const task: TaskData = await this.taskModel.findOne({ _id: id });

    if (!task) {
      return { message: 'Task not found' };
    }
    const clockIn = new Date(task.clockIn);
    const clockOut = new Date(endTask.clockOut);
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: {
          clockOut,
          timeSpentOnTask: this.calculateTimeDifference(clockIn, clockOut),
          status: taskStatus.COMPELETED,
        },
      },
      { new: true },
    );

    return { message: 'Task Completed', task: updatedTask };
  }
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  private calculateTimeDifference(startDate: Date, endDate: Date): string {
    const diffInMillisec = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(diffInMillisec / 3600000);
    const minutes = Math.floor((diffInMillisec % 3600000) / 60000);
    const seconds = Math.floor((diffInMillisec % 60000) / 1000);

    const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

    return formattedTime;
  }
}
