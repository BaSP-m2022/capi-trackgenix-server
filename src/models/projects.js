import mongoose from 'mongoose';

const { Schema } = mongoose;

const prSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  employees: [
    {
      id: { type: String, required: true },
      nameEmployee: { type: String, required: true },
      role: { type: String, required: true },
      pm: { type: Boolean, required: true },
      hours: { type: Number },
      salary: { type: Number },
    },
  ],
});

// const prEmpSchema = new Schema({
//   id: { type: String, required: true },
//   nameEmployee: { type: String, required: true },
//   role: { type: String, required: true },
//   pm: { type: Boolean, required: true },
//   hours: { type: Number, required: true },
//   salary: { type: Number, required: true },
// });

export default mongoose.model('Project', prSchema);
