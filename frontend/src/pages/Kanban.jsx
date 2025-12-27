import {
  Wrench,
  Calendar,
  User,
  AlertTriangle,
  Plus,
  Filter,
  GripVertical,
  Clock,
  Activity,
  MoreVertical
} from "lucide-react";
import { useState } from "react";

const initialRequests = [
  {
    id: 1,
    subject: "Hydraulic pump leak detected",
    equipment: "Pump A-101",
    type: "Corrective",
    status: "New",
    assignee: "John D.",
    date: "Dec 28",
    overdue: false
  },
  {
    id: 2,
    subject: "Emergency shutdown valve failure",
    equipment: "Valve E-88",
    type: "Corrective",
    status: "New",
    assignee: "Lisa K.",
    date: "Dec 23",
    overdue: true
  },
  {
    id: 3,
    subject: "Quarterly calibration check",
    equipment: "Sensor D-112",
    type: "Preventive",
    status: "New",
    assignee: "Sarah M.",
    date: "Dec 29",
    overdue: false
  },
  {
    id: 4,
    subject: "Motor bearing inspection",
    equipment: "Motor B-204",
    type: "Preventive",
    status: "In Progress",
    assignee: "John D.",
    date: "Dec 27",
    overdue: false
  },
  {
    id: 5,
    subject: "Conveyor belt misalignment",
    equipment: "Conv C-305",
    type: "Corrective",
    status: "In Progress",
    assignee: "Mike R.",
    date: "Dec 26",
    overdue: false
  },
  {
    id: 6,
    subject: "Compressor oil leak repair",
    equipment: "Compressor E-401",
    type: "Corrective",
    status: "In Progress",
    assignee: "Lisa K.",
    date: "Dec 20",
    overdue: true
  },
  {
    id: 7,
    subject: "Filter replacement completed",
    equipment: "Filter Unit F-22",
    type: "Preventive",
    status: "Repaired",
    assignee: "Sarah M.",
    date: "Dec 24",
    overdue: false
  },
  {
    id: 8,
    subject: "Pressure sensor calibration",
    equipment: "Sensor P-89",
    type: "Preventive",
    status: "Repaired",
    assignee: "John D.",
    date: "Dec 25",
    overdue: false
  },
  {
    id: 9,
    subject: "Valve actuator replacement",
    equipment: "Valve V-45",
    type: "Corrective",
    status: "Repaired",
    assignee: "Mike R.",
    date: "Dec 22",
    overdue: false
  },
  {
    id: 10,
    subject: "Generator motor burnout",
    equipment: "Generator G-55",
    type: "Corrective",
    status: "Scrap",
    assignee: "Lisa K.",
    date: "Dec 15",
    overdue: false
  },
  {
    id: 11,
    subject: "Obsolete pump unit",
    equipment: "Pump P-Old-12",
    type: "Corrective",
    status: "Scrap",
    assignee: "Mike R.",
    date: "Dec 10",
    overdue: false
  }
];

const columns = [
  { id: "New", title: "New", color: "purple" },
  { id: "In Progress", title: "In Progress", color: "yellow" },
  { id: "Repaired", title: "Repaired", color: "green" },
  { id: "Scrap", title: "Scrap", color: "gray" }
];

export default function KanbanBoard() {
  const [requests, setRequests] = useState(initialRequests);
  const [filterType, setFilterType] = useState("All");
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const getRequestsByStatus = (status) => {
    return requests.filter(req => {
      const statusMatch = req.status === status;
      const typeMatch = filterType === "All" || req.type === filterType;
      return statusMatch && typeMatch;
    });
  };

  const handleDragStart = (e, request) => {
    setDraggedCard(request.id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (columnId) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    
    if (draggedCard) {
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === draggedCard
            ? { ...req, status: newStatus }
            : req
        )
      );
    }
    
    setDraggedCard(null);
    setDragOverColumn(null);
  };

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
              <h2 className="text-2xl font-semibold text-white">Maintenance Kanban Board</h2>
              <p className="text-sm text-gray-300 mt-1">
                Track and manage maintenance requests through their lifecycle
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Corrective">Corrective</option>
                  <option value="Preventive">Preventive</option>
                </select>
              </div>
              
              {/* Create Button */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-400/30">
                <Plus className="w-4 h-4" />
                Create Request
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map(column => {
            const columnRequests = getRequestsByStatus(column.id);
            return (
              <KanbanColumn 
                key={column.id}
                column={column}
                requests={columnRequests}
                draggedCard={draggedCard}
                dragOverColumn={dragOverColumn}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
            );
          })}
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

function KanbanColumn({ 
  column, 
  requests, 
  draggedCard, 
  dragOverColumn,
  onDragStart, 
  onDragEnd, 
  onDragOver, 
  onDragEnter,
  onDragLeave,
  onDrop 
}) {
  const colorStyles = {
    purple: "from-purple-500/20 to-purple-600/20 border-purple-400/30",
    yellow: "from-yellow-500/20 to-orange-500/20 border-yellow-400/30",
    green: "from-emerald-500/20 to-green-600/20 border-emerald-400/30",
    gray: "from-gray-500/20 to-gray-600/20 border-gray-400/30"
  };

  const badgeStyles = {
    purple: "bg-purple-500/30 text-purple-200 border-purple-400/40",
    yellow: "bg-yellow-500/30 text-yellow-200 border-yellow-400/40",
    green: "bg-emerald-500/30 text-emerald-200 border-emerald-400/40",
    gray: "bg-gray-500/30 text-gray-300 border-gray-400/40"
  };

  const isDropZone = dragOverColumn === column.id;

  return (
    <div 
      className="flex flex-col h-full"
      onDragOver={onDragOver}
      onDragEnter={() => onDragEnter(column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
    >
      {/* Column Header */}
      <div className={`backdrop-blur-xl bg-gradient-to-br ${colorStyles[column.color]} rounded-2xl p-4 border shadow-lg mb-4 transition-all duration-200 ${
        isDropZone ? 'ring-2 ring-white/40 scale-105' : ''
      }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{column.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeStyles[column.color]}`}>
            {requests.length}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className={`flex-1 space-y-4 min-h-[400px] rounded-2xl p-3 transition-all duration-200 ${
        isDropZone ? 'bg-white/5 border-2 border-dashed border-white/30' : ''
      }`}>
        {requests.map(request => (
          <RequestCard 
            key={request.id} 
            request={request}
            isDragging={draggedCard === request.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
        {requests.length === 0 && (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 border-dashed">
            <p className="text-gray-400 text-center text-sm">
              {isDropZone ? 'Drop here' : 'No requests'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function RequestCard({ request, isDragging, onDragStart, onDragEnd }) {
  const isScrap = request.status === "Scrap";
  
  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, request)}
      onDragEnd={onDragEnd}
      className={`backdrop-blur-xl bg-white/10 rounded-2xl p-4 border shadow-lg transition-all duration-200 cursor-move group ${
        isDragging
          ? "opacity-40 scale-95"
          : request.overdue && !isScrap
          ? "border-red-500 bg-red-500/10 ring-2 ring-red-500/30 hover:shadow-xl hover:scale-105"
          : isScrap
          ? "border-gray-500/30 opacity-60 hover:opacity-80"
          : "border-white/20 hover:bg-white/15 hover:shadow-xl hover:scale-105"
      }`}
    >
      {/* Drag Handle */}
      <div className="flex items-start gap-3 mb-3">
        <GripVertical className={`w-4 h-4 text-gray-400 mt-1 transition-opacity cursor-grab active:cursor-grabbing ${
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} />
        <div className="flex-1">
          {/* Overdue Warning */}
          {request.overdue && !isScrap && (
            <div className="flex items-center gap-1 text-red-400 text-xs font-medium mb-2">
              <AlertTriangle className="w-3 h-3" />
              Overdue
            </div>
          )}
          
          {/* Scrap Label */}
          {isScrap && (
            <div className="text-gray-400 text-xs font-medium mb-2">
              Equipment Unusable
            </div>
          )}

          {/* Subject */}
          <h4 className={`font-semibold text-sm mb-2 leading-snug ${
            isScrap ? "text-gray-400 line-through" : "text-white"
          }`}>
            {request.subject}
          </h4>

          {/* Equipment */}
          <p className={`text-xs mb-3 ${isScrap ? "text-gray-500" : "text-gray-300"}`}>
            {request.equipment}
          </p>

          {/* Request Type Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
              request.type === "Corrective"
                ? "bg-red-500/20 text-red-300 border-red-400/30"
                : "bg-blue-500/20 text-blue-300 border-blue-400/30"
            }`}>
              {request.type === "Corrective" ? (
                <Wrench className="w-3 h-3" />
              ) : (
                <Calendar className="w-3 h-3" />
              )}
              {request.type}
            </span>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg border border-white/20">
                <User className="w-3 h-3 text-blue-300" />
              </div>
              <span className={`text-xs font-medium ${isScrap ? "text-gray-500" : "text-gray-300"}`}>
                {request.assignee}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className={`w-3 h-3 ${
                request.overdue && !isScrap ? "text-red-400" : isScrap ? "text-gray-500" : "text-gray-400"
              }`} />
              <span className={`text-xs font-medium ${
                request.overdue && !isScrap ? "text-red-400" : isScrap ? "text-gray-500" : "text-gray-300"
              }`}>
                {request.date}
              </span>
            </div>
          </div>
        </div>

        {/* Action Menu */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}