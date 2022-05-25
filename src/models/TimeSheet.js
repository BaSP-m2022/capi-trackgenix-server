import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  hoursWorked: { type: Number, required: true },
  dailyHS: { type: Number, required: true },
});

export default mongoose.model('TimeSheet', timeSheetSchema);
