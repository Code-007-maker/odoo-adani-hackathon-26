import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import maintenanceRoutes from "./routes/maintenance.route.js";

app.use("/api/maintenance", maintenanceRoutes);

app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:5173", // exact frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]}
));
app.use(express.json());
app.use(urlencoded({ extended: true }));

import userRouter from './routes/user.route.js';
import equipmentRoutes from './routes/equipmentRoutes.js'

app.use('/users', userRouter);
app.use('/equipments', equipmentRoutes);

export default app;