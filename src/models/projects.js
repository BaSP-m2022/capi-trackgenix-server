import mongoose from 'mongoose';

const { Schema } = mongoose;

const prEmpSchema = new Schema({
  idEmp: { type: String, required: true },
  role: { type: String, required: true },
  pm: { type: Boolean, required: true },
  hours: { type: Number, required: true },
  salary: { type: Number, required: true },
});

const prSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  employees: { type: [prEmpSchema], default: [] },
});

const ProjectSchema = mongoose.model('Project', prSchema);

export default ProjectSchema;
