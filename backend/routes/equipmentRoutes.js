import express from "express";
import Equipment from '../models/equipment_model.js';

// 1. Create the router instance
const router = express.Router();

// @route   GET /equipment
// @desc    Get all equipment (formatted for frontend)
router.get('/', async (req, res) => {
  try {
    // Fetch from DB
    const equipmentList = await Equipment.find().sort({ createdAt: -1 });

    // Format Response to match your Frontend Table Columns exactly
    const formattedData = equipmentList.map(item => ({
      id: item._id,                  
      name: item.name,               
      employee: item.assignedEmployee, // DB 'assignedEmployee' -> Frontend 'employee'
      department: item.department,   
      serial: item.serialNumber,       // DB 'serialNumber' -> Frontend 'serial'
      technician: item.technician,   
      category: item.category,       
      company: item.company,         
      status: item.status            
    }));

    res.json(formattedData);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /equipment
// @desc    Create new equipment
router.post('/', async (req, res) => {
  const {
    name, category, company, usedBy, maintenanceTeam,
    assignedDate, technician, employee, scrapDate,
    location, workCenter, description, serial
  } = req.body;

  try {
    const newEquipment = new Equipment({
      name,
      category,
      company,
      usedBy,
      maintenanceTeam,
      assignedDate,
      technician,
      assignedEmployee: employee, // Map frontend 'employee' to DB 'assignedEmployee'
      department: req.body.department || 'Unassigned',
      // Use provided serial or generate a fallback
      serialNumber: serial || `EQ-${Date.now()}`, 
      location,
      workCenter,
      description
    });

    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Export the router instance
export default router;