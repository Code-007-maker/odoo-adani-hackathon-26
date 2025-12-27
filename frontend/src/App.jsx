import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import KanbanBoard from "./pages/Kanban";
import MaintenanceCalendar from "./pages/Calendar";
import Teams from './pages/Teams'
import Equipment from './pages/Equipment'
import EquipmentCategories from './pages/EquipmentCategories'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<MaintenanceCalendar />} />
        <Route path='/equipment' element={<Equipment/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/equipment-categories' element={<EquipmentCategories/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
