// Updated Bug Schema
import mongoose, { Document, Schema } from "mongoose";

export interface IBug extends Document {
  user_id: string; // Changed from userId to user_id
  project_name: string; // Changed from projectName to project_name
  userName: string;
  feedback: string;
  status: "pending" | "completed"  // Added "completed"
  bugDetails: {
    bugTitle: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const BugSchema = new Schema<IBug>(
  {
    user_id: {
      type: String, // Changed to String to match your payload
      required: [true, "User ID is required"],
      trim: true,
    },
    project_name: { // Changed from projectName
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
    status: {
      type: String,
      enum: ["pending", "completed"], 
      default: "pending",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bug || mongoose.model<IBug>("Bug", BugSchema);

