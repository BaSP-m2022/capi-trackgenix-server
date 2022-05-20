import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectEmployeeSchema = new Schema({
  idEmployee: { type: String, required: true },
  employeeRole: { type: String, required: true },
  isProjectManager: { type: Boolean, required: true },
  hours: { type: Number, required: true },
  salary: { type: Number, required: true },
});

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectType: { type: String, required: true },
  employees: { type: [projectEmployeeSchema], default: [] },
});

const ProjectSchema = mongoose.model('Project', projectSchema);

export default ProjectSchema;
