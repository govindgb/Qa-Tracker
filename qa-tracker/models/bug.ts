import mongoose, { Document, Schema } from 'mongoose';

export interface IBug extends Document {
  projectName: string;
  testingRound: number;
  bugDescription: string;
  feedback: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  testerId: mongoose.Types.ObjectId;
  testerName: string;
  testerEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const BugSchema = new Schema<IBug>({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    minlength: [2, 'Project name must be at least 2 characters'],
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  testingRound: {
    type: Number,
    required: [true, 'Testing round is required'],
    min: [1, 'Testing round must be at least 1']
  },
  bugDescription: {
    type: String,
    required: [true, 'Bug description is required'],
    trim: true,
    minlength: [10, 'Bug description must be at least 10 characters'],
    maxlength: [1000, 'Bug description cannot exceed 1000 characters']
  },
  feedback: {
    type: String,
    required: [true, 'Feedback is required'],
    trim: true,
    minlength: [5, 'Feedback must be at least 5 characters'],
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  testerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testerName: {
    type: String,
    required: true
  },
  testerEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Bug || mongoose.model<IBug>('Bug', BugSchema);