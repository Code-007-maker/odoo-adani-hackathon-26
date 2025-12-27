import { Router } from "express";
import {
  createRequest,
  getRequests,
  updateStatus,
  assignRequest,
} from "../controllers/maintenance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createRequest);
router.get("/", verifyJWT, getRequests);
router.patch("/:id/status", verifyJWT, updateStatus);
router.patch("/:id/assign", verifyJWT, assignRequest);

export default router;
