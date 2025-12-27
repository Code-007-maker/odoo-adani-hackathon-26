import {
  Activity,
  ArrowLeft,
  Edit3,
  FileText,
  Save,
  Send,
  Calendar,
  Wrench,
  Package,
  MapPin,
  User,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Search,
  Zap,
  TrendingUp,
  Minus
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


const equipmentOptions = [
  { id: "pump-a101", name: "Pump A-101", category: "Pumps" },
  { id: "motor-b204", name: "Motor B-204", category: "Motors" },
  { id: "conv-c305", name: "Conveyor C-305", category: "Conveyors" },
  { id: "sensor-d112", name: "Sensor D-112", category: "Sensors" },
  { id: "comp-e401", name: "Compressor E-401", category: "Compressors" },
  { id: "valve-f88", name: "Valve E-88", category: "Valves" }
];

const categories = ["Pumps", "Motors", "Conveyors", "Sensors", "Compressors", "Valves", "Computers", "Generators"];
const technicians = ["John D.", "Sarah M.", "Mike R.", "Lisa K.", "Alex P."];

export default function MaintenanceRequest() {
  const [status, setStatus] = useState("New");
  const [maintenanceType, setMaintenanceType] = useState("Corrective");
  const [priority, setPriority] = useState("Medium");
  const [activeTab, setActiveTab] = useState("instructions");
  const { user } = useUser();
const isManager = user.role === "Manager";

  const statusConfig = {
    "New": { color: "purple", icon: AlertCircle },
    "In Progress": { color: "yellow", icon: Clock },
    "Repaired": { color: "green", icon: CheckCircle },
    "Scrap": { color: "gray", icon: Minus }
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;
const navigate = useNavigate();
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
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-xl transition-all" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20">
                    <Activity className="w-6 h-6 text-blue-300" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GearGuard
                  </h1>
                </div>
                <h2 className="text-2xl font-semibold text-white">Maintenance Request</h2>
                <p className="text-sm text-gray-300 mt-1">Create and manage maintenance activities</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={status} />
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all font-medium">
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl hover:bg-white/15 transition-all font-medium">
                <FileText className="w-4 h-4" />
                Worksheet
              </button>
            </div>
          </div>

          {/* Workflow Progress */}
          <div className="mt-6">
            <WorkflowIndicator currentStatus={status} />
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid grid-cols-1 gap-6 mb-6 ${
    isManager ? "lg:grid-cols-3" : "lg:grid-cols-1"
  }`}>
          {/* Left Panel - Request Details */}
          <div className={`space-y-6 ${
    isManager ? "lg:col-span-2" : "lg:col-span-1"
  }`}>
            {/* Basic Information */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-400" />
                Request Details
              </h3>

              <div className="space-y-4">
                <FormField label="Subject" icon={FileText}>
                  <input
                    type="text"
                    placeholder="Describe the maintenance issue"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </FormField>

                <FormField label="Created By" icon={User}>
                  <input
                    type="text"
                    value="John Maintenance"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Maintenance For" icon={Package}>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer">
                      <option value="equipment" className="bg-slate-800 text-white">Equipment</option>
                      <option value="workcenter" className="bg-slate-800 text-white">Work Center</option>
                    </select>
                  </FormField>

                  <FormField label="Equipment" icon={Search}>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer">
                      <option value="">Select equipment...</option>
                      {equipmentOptions.map(eq => (
                        <option key={eq.id} value={eq.id} className="bg-slate-800 text-white">{eq.name}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Category" icon={Package}>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer">
                      <option value="">Select category...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-800 text-white">{cat}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Request Date" icon={Calendar}>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all"
                    />
                  </FormField>
                </div>

                <FormField label="Maintenance Type">
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Corrective"
                        checked={maintenanceType === "Corrective"}
                        onChange={(e) => setMaintenanceType(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        maintenanceType === "Corrective"
                          ? "bg-red-500/20 border-red-400/50 ring-2 ring-red-400/30"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}>
                        <div className="flex items-center gap-3">
                          <Wrench className={`w-5 h-5 ${maintenanceType === "Corrective" ? "text-red-300" : "text-gray-400"}`} />
                          <div>
                            <p className="text-white font-semibold text-sm">Corrective</p>
                            <p className="text-gray-400 text-xs">Fix breakdowns</p>
                          </div>
                        </div>
                      </div>
                    </label>

{isManager && (
  <label className="flex-1">
    <input
      type="radio"
      name="maintenanceType"
      value="Preventive"
      checked={maintenanceType === "Preventive"}
      onChange={(e) => setMaintenanceType(e.target.value)}
      className="sr-only"
    />
    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      maintenanceType === "Preventive"
        ? "bg-blue-500/20 border-blue-400/50 ring-2 ring-blue-400/30"
        : "bg-white/5 border-white/10 hover:bg-white/10"
    }`}>
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-blue-300" />
        <div>
          <p className="text-white font-semibold text-sm">Preventive</p>
          <p className="text-gray-400 text-xs">Scheduled maintenance</p>
        </div>
      </div>
    </div>
  </label>
)}

                  </div>
                </FormField>
              </div>
            </div>

            {/* Notes Section */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setActiveTab("instructions")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === "instructions"
                      ? "bg-blue-500/30 text-blue-300 border border-blue-400/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === "notes"
                      ? "bg-blue-500/30 text-blue-300 border border-blue-400/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Internal Notes
                </button>
              </div>

              <textarea
                rows={6}
                placeholder={activeTab === "instructions" ? "Provide detailed maintenance instructions..." : "Add internal notes for the team..."}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Right Panel - Assignment & Planning */}
          <div className="space-y-6">
            {/* Assignment */}
            {isManager &&  (<div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Assignment
              </h3>

              <div className="space-y-4">
                <FormField label="Team" icon={Users}>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer">
                    <option value="internal" className="bg-slate-800 text-white">Internal Maintenance</option>
                    <option value="external"className="bg-slate-800 text-white">External Vendor</option>
                  </select>
                </FormField>

                <FormField label="Technician" icon={User}>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer">
                    <option value="">Assign to...</option>
                    {technicians.map(tech => (
                      <option key={tech} value={tech} className="bg-slate-800 text-white">{tech}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Scheduled Date" icon={Calendar}>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </FormField>

                <FormField label="Duration (hours)" icon={Clock}>
                  <input
                    type="number"
                    placeholder="Estimated hours"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </FormField>
              </div>
            </div>)}

            {/* Priority */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Priority
              </h3>

              <div className="space-y-3">
                <PriorityOption
                  value="Low"
                  selected={priority === "Low"}
                  onClick={() => setPriority("Low")}
                  icon={TrendingUp}
                  color="green"
                />
                <PriorityOption
                  value="Medium"
                  selected={priority === "Medium"}
                  onClick={() => setPriority("Medium")}
                  icon={AlertCircle}
                  color="yellow"
                />
                <PriorityOption
                  value="High"
                  selected={priority === "High"}
                  onClick={() => setPriority("High")}
                  icon={Zap}
                  color="red"
                />
              </div>
            </div>

            {/* Location */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Location
              </h3>

              <div className="space-y-4">
                <FormField label="Company" icon={Package}>
                  <input
                    type="text"
                    value="GearGuard Industries"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                  />
                </FormField>

                <FormField label="Location" icon={MapPin}>
                  <input
                    type="text"
                    value="Plant A - Section 2"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                  />
                </FormField>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer Actions */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Ready to save and assign</span>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all flex items-center gap-2" onClick={() => navigate("/dashboard")}>
                <Save className="w-4 h-4" />
                Save Request
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2 border border-purple-400/30" onClick={() =>{ navigate("/kanban")}}>
                <Send className="w-4 h-4" />
                Assign & Move to Kanban
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2 border border-blue-400/30" onClick={() => navigate("/calendar")}>
                <Calendar className="w-4 h-4" />
                Schedule in Calendar
              </button>
            </div>
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

function StatusBadge({ status }) {
  const statusConfig = {
    "New": { color: "bg-purple-500/30 text-purple-200 border-purple-400/40", icon: AlertCircle },
    "In Progress": { color: "bg-yellow-500/30 text-yellow-200 border-yellow-400/40", icon: Clock },
    "Repaired": { color: "bg-green-500/30 text-green-200 border-green-400/40", icon: CheckCircle },
    "Scrap": { color: "bg-gray-500/30 text-gray-300 border-gray-400/40", icon: Minus }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.color} backdrop-blur-xl font-semibold text-sm`}>
      <Icon className="w-4 h-4" />
      {status}
    </div>
  );
}

function WorkflowIndicator({ currentStatus }) {
  const stages = ["New", "In Progress", "Repaired", "Scrap"];
  const currentIndex = stages.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-2">
      {stages.map((stage, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;

        return (
          <div key={stage} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                isActive
                  ? "bg-blue-500/30 border-blue-400 scale-110"
                  : isPast
                  ? "bg-green-500/30 border-green-400"
                  : "bg-white/10 border-white/20"
              }`}>
                {isPast ? (
                  <CheckCircle className="w-4 h-4 text-green-300" />
                ) : (
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActive ? "text-blue-300" : isPast ? "text-green-300" : "text-gray-400"
              }`}>
                {stage}
              </span>
            </div>
            {index < stages.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${
                isPast ? "bg-green-400" : "bg-white/20"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function PriorityOption({ value, selected, onClick, icon: Icon, color }) {
  const colorConfig = {
    green: {
      bg: "bg-green-500/20 border-green-400/50 ring-green-400/30",
      icon: "text-green-300"
    },
    yellow: {
      bg: "bg-yellow-500/20 border-yellow-400/50 ring-yellow-400/30",
      icon: "text-yellow-300"
    },
    red: {
      bg: "bg-red-500/20 border-red-400/50 ring-red-400/30",
      icon: "text-red-300"
    }
  };

  const config = colorConfig[color];

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all ${
        selected
          ? `${config.bg} ring-2`
          : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${selected ? config.icon : "text-gray-400"}`} />
          <span className="text-white font-semibold">{value}</span>
        </div>
        {selected && (
          <CheckCircle className={`w-5 h-5 ${config.icon}`} />
        )}
      </div>
    </button>
  );
}