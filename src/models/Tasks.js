import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  idEmp: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
});

export default mongoose.model('Task', taskSchema);
