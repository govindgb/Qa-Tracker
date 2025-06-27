import mongoose, { Schema, Document } from 'mongoose';

interface IArray extends Document {
  items: string[];
}

const arraySchema: Schema = new Schema({
  items: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

const ArrayModel = mongoose.model<IArray>('Array', arraySchema);

export default ArrayModel;