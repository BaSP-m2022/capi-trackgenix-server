import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  idEmployee: { type: String, required: true },
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
});

export default mongoose.model('Task', taskSchema);
