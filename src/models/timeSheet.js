import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  idEmployee: Number,
  hoursWorked: { type: Number, required: true },
  dailyHS: { type: Number, required: true },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
