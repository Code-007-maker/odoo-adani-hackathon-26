import {
  ChevronLeft,
  ChevronRight,
  Activity,
  ArrowLeft,
  Layers,
  Plus,
  Wrench,
  User
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const preventiveMaintenanceTasks = [
  {
    id: 1,
    equipmentName: "Pump A-101",
    taskName: "Oil change & filter replacement",
    scheduledDate: "2025-01-02",
    priority: "High",
    assignee: "John D.",
    type: "Preventive"
  },
  {
    id: 2,
    equipmentName: "Motor B-204",
    taskName: "Bearing inspection",
    scheduledDate: "2025-01-02",
    priority: "Medium",
    assignee: "Sarah M.",
    type: "Preventive"
  },
  {
    id: 3,
    equipmentName: "Compressor F-22",
    taskName: "Quarterly service check",
    scheduledDate: "2025-01-05",
    priority: "Medium",
    assignee: "Mike R.",
    type: "Preventive"
  },
  {
    id: 4,
    equipmentName: "Conv C-305",
    taskName: "Belt tension adjustment",
    scheduledDate: "2025-01-08",
    priority: "Low",
    assignee: "Lisa K.",
    type: "Preventive"
  },
  {
    id: 5,
    equipmentName: "Sensor D-112",
    taskName: "Calibration check",
    scheduledDate: "2025-01-08",
    priority: "High",
    assignee: "John D.",
    type: "Preventive"
  },
  {
    id: 6,
    equipmentName: "Valve E-88",
    taskName: "Actuator lubrication",
    scheduledDate: "2025-01-10",
    priority: "Low",
    assignee: "Sarah M.",
    type: "Preventive"
  },
  {
    id: 7,
    equipmentName: "Pump P-55",
    taskName: "Seal replacement",
    scheduledDate: "2025-01-12",
    priority: "High",
    assignee: "Mike R.",
    type: "Preventive"
  },
  {
    id: 8,
    equipmentName: "Motor M-99",
    taskName: "Winding temperature check",
    scheduledDate: "2025-01-15",
    priority: "Medium",
    assignee: "Lisa K.",
    type: "Preventive"
  },
  {
    id: 9,
    equipmentName: "Compressor C-77",
    taskName: "Air filter replacement",
    scheduledDate: "2025-01-15",
    priority: "Low",
    assignee: "John D.",
    type: "Preventive"
  },
  {
    id: 10,
    equipmentName: "Conveyor CV-44",
    taskName: "Roller inspection",
    scheduledDate: "2025-01-18",
    priority: "Medium",
    assignee: "Sarah M.",
    type: "Preventive"
  }
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MaintenanceCalendar() {
    const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTasksForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return preventiveMaintenanceTasks.filter(task => task.scheduledDate === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push(date);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20">
                  <Activity className="w-6 h-6 text-blue-300" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GearGuard
                </h1>
              </div>
              <h2 className="text-2xl font-semibold text-white">Maintenance Calendar</h2>
              <p className="text-sm text-gray-300 mt-1">
                Preventive Maintenance Schedule
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={goToToday}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all font-medium"
              >
                Today
              </button>

              <div className="flex items-center gap-2 backdrop-blur-xl bg-white/10 rounded-lg border border-white/20 p-1">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="px-4 text-white font-semibold text-sm whitespace-nowrap">
                  {monthNames[month]} {year}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all font-medium" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all font-medium" onClick={() => navigate("/kanban")}>
            <Layers className="w-4 h-4" />
            View in Kanban
          </button>
        </div>

        {/* Calendar */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-3 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center py-3 text-gray-300 font-semibold text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {calendarDays.map((date, index) => {
              if (date === null) {
                return <div key={`empty-${index}`} className="min-h-32" />;
              }

              const tasks = getTasksForDate(date);
              const today = isToday(date);

              return (
                <CalendarDay
                  key={date}
                  date={date}
                  tasks={tasks}
                  isToday={today}
                  onClick={() => setSelectedDate(date)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function CalendarDay({ date, tasks, isToday, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/5 rounded-2xl border p-3 min-h-32 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:scale-105 hover:shadow-xl ${
        isToday
          ? "border-blue-400 ring-2 ring-blue-400/30 bg-blue-500/10"
          : "border-white/10"
      }`}
    >
      {/* Date Number */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm font-bold ${
            isToday ? "text-blue-300" : "text-white"
          }`}
        >
          {date}
        </span>
        {tasks.length === 0 && (
          <Plus className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">No scheduled maintenance</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  const priorityStyles = {
    High: "bg-red-500/20 text-red-300 border-red-400/30",
    Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    Low: "bg-green-500/20 text-green-300 border-green-400/30"
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="backdrop-blur-xl bg-white/10 rounded-xl p-2.5 border border-white/20 hover:bg-white/15 hover:shadow-lg transition-all duration-200 group cursor-pointer"
    >
      <div className="flex items-start gap-2 mb-2">
        <Wrench className="w-3 h-3 text-blue-300 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-xs font-bold leading-tight truncate">
            {task.equipmentName}
          </h4>
          <p className="text-gray-300 text-xs leading-tight mt-0.5 line-clamp-2">
            {task.taskName}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">{task.assignee}</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}