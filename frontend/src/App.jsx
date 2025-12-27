import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import KanbanBoard from "./pages/Kanban";
import MaintenanceCalendar from "./pages/Calendar";


import Login from './pages/Login.jsx'
// import Navbar from './components/Navbar'
// import  SnippetFilter from './components/Search'
// import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
// import SnippetCard from './components/SnippetCard'
// import AddSnippet from './components/AddSnippet'
// import EditSnippet from './components/EditSnippet'
// import ViewSnippet from './components/ViewSnippet'
// import { View } from 'lucide-react'
// import ConfirmDelete from './components/ConfirmDelete'
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
// import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<MaintenanceCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
