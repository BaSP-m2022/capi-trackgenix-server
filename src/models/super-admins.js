import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  email: String,
  password: String,
});

export default mongoose.model('SuperAdmin', superAdminSchema);
