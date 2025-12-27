import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema(
  {
    // --- Basic Identifiers ---
    name: {
      type: String,
      required: [true, "Equipment name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["monitors", "computers", "machinery", "vehicles", "other"],
      lowercase: true,
    },

    company: {
      type: String,
      default: "My Company (San Francisco)",
    },

    usedBy: {
      type: String,
      enum: ["Employee", "Department"],
      default: "Employee",
    },

    maintenanceTeam: {
      type: String,
      required: true,
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    location: {
      type: String,
    },

    workCenter: {
      type: String,
    },

    // --- Responsibility & Assignment ---
    employee: {
      type: String,
    },

    technician: {
      type: String,
      required: true,
    },

    serialNumber: {
      type: String,
    },

    scrapDate: {
      type: Date,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Equipment = mongoose.model("Equipment", EquipmentSchema);

export default Equipment;
