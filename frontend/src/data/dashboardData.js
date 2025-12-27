export const stats = [
  { title: "Total Equipment", value: 24 },
  { title: "Open Requests", value: 7 },
  { title: "In Progress", value: 4 },
  { title: "Repaired", value: 12 },
  { title: "Overdue", value: 2 },
];

export const requests = [
  {
    id: 1,
    subject: "Leaking Oil",
    equipment: "CNC Machine",
    technician: "Rohit",
    status: "In Progress",
    date: "Today",
  },
  {
    id: 2,
    subject: "Printer Not Working",
    equipment: "Printer 01",
    technician: "Amit",
    status: "New",
    date: "Tomorrow",
  },
];

export const equipmentHealth = [
  { name: "CNC Machine", status: "Under Maintenance" },
  { name: "Office Laptop", status: "OK" },
  { name: "Generator", status: "Scrap" },
];
