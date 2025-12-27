import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import KanbanBoard from "./pages/Kanban";
import MaintenanceCalendar from "./pages/Calendar";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<MaintenanceCalendar />} />
        <Route path="/main-req" element={<MaintenanceRequest/>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;


