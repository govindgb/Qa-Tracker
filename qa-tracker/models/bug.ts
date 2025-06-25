import mongoose, { Document, Schema } from "mongoose";
 
export interface IBug extends Document {
  projectName: string;
  testingRound: number;
  bug: {
    bugTitle: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
  }[];
  status: "pending" | "in-progress" | "resolved" | "rejected";
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}
 
const BugSchema = new Schema<IBug>(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },
    testingRound: {
      type: Number,
      required: [true, "Testing round is required"],
      min: [1, "Testing round must be at least 1"],
    },
    bug: {
      type: [
        {
          bugTitle: {
            type: String,
            required: [true, "Bug title is required"],
            trim: true,
          },
          description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
          },
          priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "low",
          },
        },
      ],
      required: [true, "Bug array is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"],
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
 
export default mongoose.models.Bug || mongoose.model<IBug>("Bug", BugSchema);
 