import React, { useState } from 'react';
import { Plus, Search, X, Save, Layers } from 'lucide-react';

const EquipmentCategories = () => {
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data based on your screenshot 
  const [categories, setCategories] = useState([
    { id: 1, name: "Computers", responsible: "OdooBot", company: "My Company (San Francisco)" },
    { id: 2, name: "Software", responsible: "OdooBot", company: "My Company (San Francisco)" },
    { id: 3, name: "Monitors", responsible: "Mitchell Admin", company: "My Company (San Francisco)" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    responsible: "",
    company: "My Company (San Francisco)"
  });

  // --- HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    const newCat = {
      id: categories.length + 1,
      name: formData.name,
      responsible: formData.responsible || "OdooBot",
      company: formData.company
    };
    setCategories([...categories, newCat]);
    setIsModalOpen(false);
    setFormData({ name: "", responsible: "", company: "My Company (San Francisco)" });
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 relative">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition shadow-sm font-medium"
          >
            <Plus size={18} /> New
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Equipment Categories</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {/* --- TABLE VIEW --- */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Responsible</th>
              <th className="px-6 py-4 font-medium">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-slate-400" />
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                    @{cat.responsible}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {cat.company}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">New Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Category Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-slate-300 focus:border-blue-500 outline-none py-2"
                  placeholder="e.g. Vehicles" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Responsible Person</label>
                <select 
                  value={formData.responsible}
                  onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                  className="w-full border-b border-slate-300 focus:border-blue-500 outline-none py-2 bg-transparent"
                >
                  <option value="">Select User...</option>
                  <option value="OdooBot">OdooBot</option>
                  <option value="Mitchell Admin">Mitchell Admin</option>
                  <option value="Marc Demo">Marc Demo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Company</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full border-b border-slate-300 focus:border-blue-500 outline-none py-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
                  <Save size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EquipmentCategories;