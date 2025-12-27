import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import KanbanBoard from "./pages/Kanban";
import MaintenanceCalendar from "./pages/Calendar";


import Login from './pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<MaintenanceCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
