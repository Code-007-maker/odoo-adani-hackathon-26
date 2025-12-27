import React, { useState } from "react";
import { Plus, Search, X, Save, Layers, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EquipmentCategories = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA ---
  const [categories, setCategories] = useState([
    { id: 1, name: "Computers", responsible: "OdooBot", company: "My Company (San Francisco)" },
    { id: 2, name: "Software", responsible: "OdooBot", company: "My Company (San Francisco)" },
    { id: 3, name: "Monitors", responsible: "Mitchell Admin", company: "My Company (San Francisco)" },
  ]);

  // --- FORM ---
  const [formData, setFormData] = useState({
    name: "",
    responsible: "",
    company: "My Company (San Francisco)",
  });

  // --- HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    const newCategory = {
      id: categories.length + 1,
      name: formData.name,
      responsible: formData.responsible || "OdooBot",
      company: formData.company,
    };
    setCategories([...categories, newCategory]);
    setIsModalOpen(false);
    setFormData({ name: "", responsible: "", company: "My Company (San Francisco)" });
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Equipment Categories
              </h1>
              <p className="text-sm text-gray-400">
                Manage asset classification and ownership
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Category</span>
            </button>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-300 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Responsible</th>
                <th className="px-6 py-4 font-medium">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-300">
                      <Layers size={16} />
                    </div>
                    {cat.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                      @{cat.responsible}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {cat.company}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCategories.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>No categories found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold text-white">New Equipment Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <Input
                label="Category Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Select
                label="Responsible"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                options={["OdooBot", "Mitchell Admin", "Marc Demo"]}
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
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg transition-all"
                >
                  <Save size={16} /> Save
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

/* --- REUSABLE INPUTS --- */

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <select
      {...props}
      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
    >
      <option value="" className="text-gray-500">Select user...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default EquipmentCategories;