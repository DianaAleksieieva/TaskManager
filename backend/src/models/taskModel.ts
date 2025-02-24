import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  category: string;
  status: string;
  dueDate: Date;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
