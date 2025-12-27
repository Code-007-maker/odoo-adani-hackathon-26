import { MaintenanceRequest } from "../models/maintenanceRequest.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* CREATE REQUEST (Employee / Manager) */
export const createRequest = asyncHandler(async (req, res) => {
  const request = await MaintenanceRequest.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, request, "Maintenance request created"));
});

/* GET ALL REQUESTS (Kanban / Calendar) */
export const getRequests = asyncHandler(async (req, res) => {
  const { status, maintenanceType } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (maintenanceType) filter.maintenanceType = maintenanceType;

  const requests = await MaintenanceRequest.find(filter)
    .populate("createdBy", "fullName email")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, requests));
});

/* UPDATE STATUS (Drag & Drop Kanban) */
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await MaintenanceRequest.findById(req.params.id);
  if (!request) throw new ApiError(404, "Request not found");

  request.status = status;
  if (status === "Scrap") request.isScrapped = true;

  await request.save();

  res.status(200).json(new ApiResponse(200, request, "Status updated"));
});

/* ASSIGN TECHNICIAN (Manager only) */
export const assignRequest = asyncHandler(async (req, res) => {
  const { team, technician, scheduledDate, durationHours } = req.body;

  if (!req.user.roles.includes("MAINTENANCE_TEAM_MANAGER")) {
    throw new ApiError(403, "Only manager can assign request");
  }

  const request = await MaintenanceRequest.findById(req.params.id);
  if (!request) throw new ApiError(404, "Request not found");

  request.team = team;
  request.assignedTechnician = technician;
  request.scheduledDate = scheduledDate;
  request.durationHours = durationHours;
  request.status = "In Progress";

  await request.save();

  res
    .status(200)
    .json(new ApiResponse(200, request, "Request assigned successfully"));
});
