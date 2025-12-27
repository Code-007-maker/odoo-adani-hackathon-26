import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import KanbanBoard from "./pages/Kanban";
import MaintenanceCalendar from "./pages/Calendar";
import Teams from './pages/Teams'
import Equipment from './pages/Equipment'
import EquipmentCategories from './pages/EquipmentCategories'
import MaintenanceRequest from "./pages/MaintenanceRequest";
import { UserProvider } from "./context/UserContext";
import Home from './pages/Home'


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<MaintenanceCalendar />} />
        <Route path='/equipment' element={<Equipment/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/equipment-categories' element={<EquipmentCategories/>}/>
        <Route path="/main-req" element={<MaintenanceRequest/>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;


