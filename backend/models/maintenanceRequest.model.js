import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    instructions: {
      type: String,
      trim: true,
    },

    internalNotes: {
      type: String,
      trim: true,
    },

    maintenanceType: {
      type: String,
      enum: ["Corrective", "Preventive"],
      required: true,
    },

    status: {
      type: String,
      enum: ["New", "In Progress", "Repaired", "Scrap"],
      default: "New",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    equipment: {
      id: String,
      name: String,
      category: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    team: {
      type: String,
      enum: ["Internal", "External"],
    },

    assignedTechnician: {
      type: String, // later ObjectId bhi kar sakte ho
    },

    scheduledDate: {
      type: Date,
    },

    durationHours: {
      type: Number,
    },

    location: {
      company: String,
      plant: String,
    },

    isScrapped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
