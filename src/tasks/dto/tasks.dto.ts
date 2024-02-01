import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export interface UserInfo {
  id: ObjectId;
  email: string;
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}

export interface TaskData {
  _id?: string;
  title?: string;
  status?: string;
  user?: string;
  clockIn?: string;
  clockOut?: string;
  timeSpentOnTask?: number;
  createdAt?: string;
  updatedAt?: string;
}

export class StartTaskDto {
  @IsNotEmpty()
  @IsString()
  clockIn: string;
}
export class EndTaskDto {
  @IsNotEmpty()
  @IsString()
  clockOut: string;
}
