import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

export const taskStatus = {
  COMPELETED: 'completed',
  INPROGRESS: 'in progress',
  PENDING: 'pending',
};

export const taskPrioritys = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    timeSpentOnTask: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    priority: {
      type: String,
      enum: Object.values(taskPrioritys),
      default: taskPrioritys.LOW,
    },
  },
  { timestamps: true },
);

TaskSchema.index({ title: 'text' });

export interface Task extends mongoose.Document {
  title: string;
  status: string;
  timeSpentOnTask?: number;
  user: ObjectId;
  priority?: string;
}
