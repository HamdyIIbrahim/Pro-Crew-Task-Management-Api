import mongoose, { ObjectId } from 'mongoose';
const Schema = mongoose.Schema;
export const taskStatus = {
  COMPELETED: 'completed',
  INPROGRESS: 'progress',
  PENDING: 'pending',
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
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    priority: {
      type: Number,
    },
  },
  { timestamps: true },
);

TaskSchema.index({ title: 'text' });

export interface Task extends mongoose.Document {
  title: string;
  status: string;
  timeSpentOnTask?: string;
  user: ObjectId;
  priority?: number;
}
