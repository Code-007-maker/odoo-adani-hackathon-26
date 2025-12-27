import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  CalendarCheck
} from "lucide-react";

import { useNavigate } from "react-router-dom";



const stats = {
  totalEquipment: 24,
  openRequests: 7,
  overdue: 2,
  repaired: 12
};

const requests = [
  { 
    id: 1, 
    subject: "Hydraulic pump leak detected", 
    equipment: "Pump A-101", 
    type: "Corrective",
    status: "In Progress", 
    date: "Dec 28",
    overdue: false,
    assignee: "John D."
  },
  { 
    id: 2, 
    subject: "Motor bearing inspection", 
    equipment: "Motor B-204", 
    type: "Preventive",
    status: "New", 
    date: "Dec 29",
    overdue: false,
    assignee: "Sarah M."
  },
  { 
    id: 3, 
    subject: "Conveyor belt replacement", 
    equipment: "Conv C-305", 
    type: "Corrective",
    status: "Repaired", 
    date: "Dec 24",
    overdue: true,
    assignee: "Mike R."
  },
  { 
    id: 4, 
    subject: "Quarterly calibration check", 
    equipment: "Sensor D-112", 
    type: "Preventive",
    status: "In Progress", 
    date: "Dec 27",
    overdue: false,
    assignee: "John D."
  },
  { 
    id: 5, 
    subject: "Emergency shutdown valve", 
    equipment: "Valve E-88", 
    type: "Corrective",
    status: "New", 
    date: "Dec 23",
    overdue: true,
    assignee: "Lisa K."
  }
];

const preventiveMaintenance = [
  { equipment: "Pump A-101", task: "Oil change & filter", date: "Jan 2", priority: "high" },
  { equipment: "Motor B-204", task: "Bearing inspection", date: "Jan 5", priority: "medium" },
  { equipment: "Compressor F-22", task: "Quarterly service", date: "Jan 8", priority: "medium" },
  { equipment: "Conv C-305", task: "Belt tension check", date: "Jan 12", priority: "low" },
  { equipment: "Sensor D-112", task: "Calibration", date: "Jan 15", priority: "low" }
];

const equipmentHealth = [
  { name: "Pump A-101", status: "Under Maintenance", health: 65 },
  { name: "Motor B-204", status: "Critical", health: 25 },
  { name: "Conveyor C-305", status: "OK", health: 92 },
  { name: "Sensor D-112", status: "OK", health: 88 },
  { name: "Compressor E-401", status: "OK", health: 95 },
  { name: "Valve F-88", status: "Critical", health: 15 },
  { name: "Generator G-55", status: "Scrap", health: 0 }
];

export default function Dashboard() {
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 space-y-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-white/20">
                  <Activity className="w-8 h-8 text-blue-300" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GearGuard
                </h1>
              </div>
              <h2 className="text-2xl font-semibold text-white">Maintenance Dashboard</h2>
              <p className="text-sm text-gray-300 mt-1">
                Overview of equipment health & maintenance activity
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Last Updated</p>
              <p className="text-sm text-white font-medium">Dec 27, 2025 • 14:32</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <KpiCard 
            title="Total Equipment" 
            value="24" 
            subtitle="Active units"
            icon={<Wrench className="w-6 h-6" />} 
          />
          <KpiCard 
            title="Open Requests" 
            value="7" 
            subtitle="Pending action"
            icon={<Clock className="w-6 h-6" />} 
          />
          <KpiCard 
            title="Overdue" 
            value="2" 
            subtitle="Critical attention"
            danger 
            icon={<AlertTriangle className="w-6 h-6" />} 
          />
          <KpiCard 
            title="Repaired" 
            value="12" 
            subtitle="This month"
            success 
            icon={<CheckCircle className="w-6 h-6" />} 
          />
        </div>

        {/* Smart Insight Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <InsightCard
            title="Critical Equipment"
            value="5 Units"
            subtitle="Health below 30%"
            icon={<AlertCircle className="w-5 h-5" />}
            color="red"
          />
          <InsightCard
            title="Technician Load"
            value="85%"
            subtitle="Assign carefully"
            icon={<Users className="w-5 h-5" />}
            color="blue"
          />
          <InsightCard
            title="Open Requests"
            value="12 Pending"
            subtitle="3 Overdue"
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Active Maintenance Requests */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white text-xl flex items-center gap-2">
                <Wrench className="w-5 h-5 text-purple-400" />
                Active Maintenance Requests
              </h3>
              <button className="text-xs text-blue-300 hover:text-blue-200 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 transition-all">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-300 border-b border-white/20">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium">Issue</th>
                    <th className="text-left px-2 font-medium">Equipment</th>
                    <th className="text-center px-2 font-medium">Type</th>
                    <th className="text-center px-2 font-medium">Status</th>
                    <th className="text-center px-2 font-medium">Assignee</th>
                    <th className="text-center px-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr 
                      key={r.id} 
                      className={`border-b border-white/10 last:border-none hover:bg-white/5 transition-colors duration-200 ${
                        r.overdue ? 'bg-red-500/10 border-l-4 border-l-red-500' : ''
                      }`}
                    >
                      <td className="py-4 px-2 text-gray-200 font-medium">{r.subject}</td>
                      <td className="px-2 text-gray-300">{r.equipment}</td>
                      <td className="text-center px-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          r.type === "Corrective" 
                            ? "bg-red-500/20 text-red-300 border-red-400/30" 
                            : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                        }`}>
                          {r.type === "Corrective" ? <Wrench className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                          {r.type}
                        </span>
                      </td>
                      <td className="text-center px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          r.status === "New" ? "bg-purple-500/20 text-purple-300 border-purple-400/30" :
                          r.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30" :
                          r.status === "Repaired" ? "bg-green-500/20 text-green-300 border-green-400/30" :
                          "bg-gray-500/20 text-gray-300 border-gray-400/30"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="text-center px-2 text-gray-300">{r.assignee}</td>
                      <td className={`text-center px-2 font-medium ${r.overdue ? 'text-red-400' : 'text-gray-300'}`}>
                        {r.overdue && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                        {r.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Equipment Health Panel */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="font-semibold mb-5 text-white text-xl flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Equipment Health
            </h3>
            <ul className="space-y-3">
              {equipmentHealth.map((e, i) => (
                <li 
                  key={i} 
                  className={`flex justify-between items-center text-sm p-3 rounded-xl transition-all duration-200 backdrop-blur-sm border ${
                    e.status === "Scrap" 
                      ? "bg-gray-500/10 border-gray-500/30 opacity-50" 
                      : "bg-white/5 hover:bg-white/10 border-white/10"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`font-medium ${e.status === "Scrap" ? "text-gray-500 line-through" : "text-gray-200"}`}>
                      {e.name}
                    </span>
                    {e.status !== "Scrap" && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              e.health >= 70 ? "bg-emerald-500" :
                              e.health >= 40 ? "bg-yellow-500" :
                              "bg-red-500"
                            }`}
                            style={{width: `${e.health}%`}}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{e.health}%</span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      e.status === "OK"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                        : e.status === "Under Maintenance"
                        ? "bg-amber-500/20 text-amber-300 border-amber-400/30"
                        : e.status === "Critical"
                        ? "bg-rose-500/20 text-rose-300 border-rose-400/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {e.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preventive Maintenance & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Preventive Maintenance */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="font-semibold mb-5 text-white text-xl flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-blue-400" />
              Upcoming Preventive Maintenance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {preventiveMaintenance.map((pm, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <span className="text-xs font-medium text-blue-300">{pm.date}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      pm.priority === "high" ? "bg-red-500/20 text-red-300" :
                      pm.priority === "medium" ? "bg-yellow-500/20 text-yellow-300" :
                      "bg-green-500/20 text-green-300"
                    }`}>
                      {pm.priority}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm mb-1">{pm.equipment}</p>
                  <p className="text-gray-300 text-xs">{pm.task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="font-semibold mb-5 text-white text-xl">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-200 flex items-center justify-between group">
                <span className="text-white font-medium text-sm">View All Requests</span>
                <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-200 flex items-center justify-between group">
                <span className="text-white font-medium text-sm">Maintenance Calendar</span>
                <ArrowRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
  onClick={() => navigate("/kanban")}
  className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-200 flex items-center justify-between group"
>
  <span className="text-white font-medium text-sm">
    Go to Kanban Board
  </span>
  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
</button>

              <button className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-200 flex items-center justify-between group">
                <span className="text-white font-medium text-sm">Equipment Reports</span>
                <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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

/* ---- Components ---- */

function KpiCard({ title, value, subtitle, icon, danger, success }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 flex items-center gap-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
      <div
        className={`p-4 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 border ${
          danger
            ? "bg-gradient-to-br from-rose-500/30 to-red-600/30 text-rose-300 border-rose-400/30"
            : success
            ? "bg-gradient-to-br from-emerald-500/30 to-green-600/30 text-emerald-300 border-emerald-400/30"
            : "bg-gradient-to-br from-blue-500/30 to-cyan-600/30 text-blue-300 border-blue-400/30"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-300 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function InsightCard({ title, value, subtitle, icon, color }) {
  const colors = {
    red: "border-rose-500/50 shadow-rose-500/20",
    blue: "border-blue-500/50 shadow-blue-500/20",
    green: "border-emerald-500/50 shadow-emerald-500/20"
  };

  const gradients = {
    red: "from-rose-500/20 to-red-600/20",
    blue: "from-blue-500/20 to-cyan-600/20",
    green: "from-emerald-500/20 to-green-600/20"
  };

  const iconColors = {
    red: "text-rose-300",
    blue: "text-blue-300",
    green: "text-emerald-300"
  };

  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${gradients[color]} rounded-2xl shadow-2xl p-6 border-l-4 ${colors[color]} hover:scale-105 transition-all duration-300 border border-white/20`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-300 font-medium">{title}</p>
        <div className={iconColors[color]}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs mt-2 text-gray-400">{subtitle}</p>
    </div>
  );
}