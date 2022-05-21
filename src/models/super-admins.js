import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  email: { type: String, required: true },
  password: String,
});

export default mongoose.model('SuperAdmin', superAdminSchema);
