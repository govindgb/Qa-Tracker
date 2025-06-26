import mongoose, { Document, Schema } from "mongoose";

// Update interface to match form structure
export interface IBug extends Document {
  projectName: string;
  userName: string;
  feedback: string;
  bugDetails: {
    bugTitle: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
  }[];
  status: "pending" | "in-progress" | "resolved" | "rejected";
  userId?: mongoose.Types.ObjectId;
  userEmail?: string;
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
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
    },
    bugDetails: {
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
            default: "medium",
          },
        },
      ],
      required: [true, "Bug details array is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"],
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userEmail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bug || mongoose.model<IBug>("Bug", BugSchema);