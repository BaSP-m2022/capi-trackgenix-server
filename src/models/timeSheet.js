import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  idEmployee: Number,
  hoursWorked: Number,
  dailyHS: Number,
});

export default mongoose.model('TimeSheet', timeSheetSchema);
