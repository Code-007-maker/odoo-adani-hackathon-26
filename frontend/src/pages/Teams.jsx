import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  X,
  Save,
  ArrowLeft,
  Shield,
  MoreVertical,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA ---
  const [teams, setTeams] = useState([
    { id: 1, name: "Internal Maintenance", members: ["Anas Makari", "Sarah Connor"], company: "My Company (San Francisco)" },
    { id: 2, name: "Metrology", members: ["Marc Demo"], company: "My Company (San Francisco)" },
    { id: 3, name: "Subcontractor", members: ["Maggie Davidson", "Keith Richards"], company: "My Company (San Francisco)" },
    { id: 4, name: "Equipment Support", members: ["Mitchell Admin", "John Doe", "Jane Smith"], company: "My Company (San Francisco)" },
  ]);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    members: "",
    company: "My Company (San Francisco)",
  });

  // --- DERIVED STATS ---
  const totalTeams = teams.length;
  const totalMembers = teams.reduce((acc, team) => acc + team.members.length, 0);

  // --- HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    const newTeam = {
      id: teams.length + 1,
      name: formData.name,
      members: formData.members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      company: formData.company,
    };
    setTeams([...teams, newTeam]);
    setIsModalOpen(false);
    setFormData({ name: "", members: "", company: "My Company (San Francisco)" });
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">

      {/* --- BACKGROUND ANIMATION (Matched to Home.jsx) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">

        {/* --- HEADER --- */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Maintenance Teams
              </h1>
              <p className="text-sm text-gray-400">
                Manage specialized workforce groups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
            >
              <Plus size={18} /> <span className="hidden sm:inline">New Team</span>
            </button>
          </div>
        </div>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Shield size={24} />} label="Active Teams" value={totalTeams} color="blue" />
          <StatCard icon={<Users size={24} />} label="Total Technicians" value={totalMembers} color="purple" />
          <StatCard icon={<Briefcase size={24} />} label="Company" value="San Francisco HQ" color="emerald" />
        </div>

        {/* --- TABLE --- */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-300 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Team Name</th>
                <th className="px-6 py-4 font-medium">Members</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-300 font-bold text-xs border border-white/10">
                        {team.name.substring(0, 2).toUpperCase()}
                      </div>
                      {team.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="flex flex-wrap gap-2">
                      {team.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs hover:bg-white/10 transition-colors cursor-default text-gray-200"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          {member}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {team.company}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTeams.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <p>No teams found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold text-white">New Maintenance Team</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <Input
                label="Team Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Electricians"
              />
              <Input
                label="Team Members"
                value={formData.members}
                onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                placeholder="John, Jane (comma separated)"
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg transition-all"
                >
                  <Save size={16} className="inline mr-2" /> Save Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ANIMATIONS --- */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

/* --- REUSABLE COMPONENTS --- */

const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-300",
    purple: "bg-purple-500/20 text-purple-300",
    emerald: "bg-emerald-500/20 text-emerald-300",
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <h3 className="text-2xl font-bold text-white truncate max-w-[200px]">{value}</h3>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500"
    />
  </div>
);

export default Teams;