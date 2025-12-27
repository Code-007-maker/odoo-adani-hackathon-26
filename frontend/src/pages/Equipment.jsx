import React, { useState, useMemo } from 'react';
import { Search, Filter, Monitor, Plus, X, Save, ArrowLeft, PenTool, Database, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Equipment = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({ dept: "", status: "" });

  // Form State
  const initialFormState = {
    name: "", category: "", company: "My Company (San Francisco)",
    usedBy: "Employee", maintenanceTeam: "Internal Maintenance",
    assignedDate: new Date().toISOString().split('T')[0],
    technician: "", employee: "", scrapDate: "",
    location: "", workCenter: "", description: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  // Mock Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const assets = [
    { id: 101, name: "Samsung Monitor 15", serial: "MT/125/22778837", dept: "Admin", status: "Active", employee: "Tejas Modi", technician: "Mitchel", category: "monitors", company: "My Company (SF)" },
    { id: 102, name: "Acer Laptop", serial: "MT/122/11112222", dept: "Technician", status: "In Repair", employee: "Bhaumik P.", technician: "Marc Demo", category: "computers", company: "My Company (SF)" },
    { id: 103, name: "Dell Latitude 5420", serial: "LT/542/99887766", dept: "HR", status: "Active", employee: "Riya Sharma", technician: "Alex Brown", category: "computers", company: "My Company (SF)" },
    { id: 104, name: "CNC Machine X1", serial: "CNC-99-XA", dept: "Production", status: "Maintenance", employee: "John Doe", technician: "Mitchel", category: "machinery", company: "My Company (SF)" },
  ];

  // --- LOGIC ---
  const departments = [...new Set(assets.map(item => item.dept))];
  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === 'Active').length;
  const repairAssets = assets.filter(a => a.status === 'In Repair' || a.status === 'Maintenance').length;

  const filteredAssets = useMemo(() => {
    return assets.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.serial?.toLowerCase().includes(searchLower) ||
        item.employee?.toLowerCase().includes(searchLower);
      const matchesDept = filters.dept ? item.dept === filters.dept : true;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, filters, assets]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving new equipment:", formData);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  return (
    // UPDATED: Matched background color and selection color to Home.jsx
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative">
      
      {/* --- BACKGROUND ANIMATION (Matched to Home.jsx) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 pt-6">
        
        {/* --- HEADER --- */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              {/* UPDATED: Matched Gradient Text Style */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Equipment Inventory
              </h1>
              <p className="text-sm text-gray-400">Track and manage company assets</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search assets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Filter */}
            <div className="relative z-50">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-white/10 transition-colors ${
                  filters.dept ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 top-12 w-64 bg-slate-900 border border-white/20 rounded-xl shadow-xl p-4 space-y-4 animate-in fade-in zoom-in duration-200 z-50">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <h3 className="font-semibold text-sm text-white">Filter By</h3>
                    <button onClick={() => setFilters({dept: "", status: ""})} className="text-xs text-blue-400 hover:text-blue-300">Reset</button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-400">Department</label>
                    <select 
                      className="w-full text-sm bg-slate-800 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-purple-500"
                      value={filters.dept} 
                      onChange={(e) => setFilters({...filters, dept: e.target.value})}
                    >
                      <option value="">All Departments</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* New Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all hover:scale-105"
            >
              <Plus size={18} /> <span className="hidden sm:inline">New Asset</span>
            </button>
          </div>
        </div>

        {/* --- KPI SUMMARY --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-300"><Database size={24} /></div>
            <div><p className="text-gray-400 text-sm">Total Assets</p><h3 className="text-2xl font-bold text-white">{totalAssets}</h3></div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-300"><Monitor size={24} /></div>
            <div><p className="text-gray-400 text-sm">Active</p><h3 className="text-2xl font-bold text-white">{activeAssets}</h3></div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-300"><PenTool size={24} /></div>
            <div><p className="text-gray-400 text-sm">In Repair</p><h3 className="text-2xl font-bold text-white">{repairAssets}</h3></div>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative z-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-300 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Equipment Name</th>
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Serial #</th>
                <th className="px-6 py-4 font-medium">Technician</th>
                <th className="px-6 py-4 font-medium">Equipment Category</th>
                <th className="px-6 py-4 font-medium">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredAssets.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                      {item.category === 'monitors' ? <Monitor size={16} /> : <Laptop size={16} />}
                    </div>
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{item.employee}</td>
                  <td className="px-6 py-4 text-gray-400">{item.dept}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.serial}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{item.technician}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{item.category}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Monitor size={48} className="mx-auto mb-4 opacity-20" />
              <p>No assets found.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL POPUP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 sticky top-0 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold text-white">New Equipment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            {/* Modal Form Content */}
            <form onSubmit={handleSave} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-5">
                   <div className="space-y-1"><label className="block text-sm font-medium text-gray-400">Name</label><input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-transparent border-b border-white/20 focus:border-purple-500 outline-none py-2 text-white" placeholder="e.g. Samsung Monitor 15" /></div>
                   <div className="space-y-1"><label className="block text-sm font-medium text-gray-400">Category</label><select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-800 border-b border-white/20 focus:border-purple-500 outline-none py-2 text-white"><option value="">Select...</option><option value="monitors">Monitors</option></select></div>
                </div>
                <div className="space-y-5">
                   <div className="space-y-1"><label className="block text-sm font-medium text-gray-400">Technician</label><select name="technician" value={formData.technician} onChange={handleInputChange} className="w-full bg-slate-800 border-b border-white/20 focus:border-purple-500 outline-none py-2 text-white"><option value="">Select...</option></select></div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium shadow-lg transition-colors"><Save size={16} /> Save Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        .dark-date-picker::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
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

export default Equipment;