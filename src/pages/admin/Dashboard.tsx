import { useState, useEffect } from "react";
import { labData } from "../../data/mockData";
import { LogOut, Plus, Edit, Trash2, Save, Newspaper, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'news' | 'pubs'>('news');
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/admin");

    if (activeTab === 'news') setItems([...labData.news]);
    if (activeTab === 'pubs') setItems([...labData.publications]);
  }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  return (
    <div className="section-padding bg-slate-50 min-h-screen">
      <Helmet>
        <title>Admin Dashboard | Biometamaterials Lab</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Dashboard
          </h1>
          <p className="text-slate-500">연구실 콘텐츠 실시간 관리 도구</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200"
        >
          <LogOut size={16} className="mr-2" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'news', label: 'News Management', icon: <Newspaper size={18} /> },
            { id: 'pubs', label: 'Publications', icon: <BookOpen size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center p-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id 
                ? "bg-primary text-white shadow-xl shadow-primary/20" 
                : "bg-white text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* content Area */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
              {activeTab === 'news' ? 'News' : 'Publications'} List
            </h2>
            <button className="btn-primary flex items-center text-xs py-2">
              <Plus size={14} className="mr-1" /> Add New Item
            </button>
          </div>

          <div className="p-0">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100 text-left">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Title / Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date / Role</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-900">{item.title || item.name}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.journal || item.description || item.content}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                        {item.date || item.role || item.year}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {items.length === 0 && (
              <div className="p-20 text-center text-slate-400">
                데이터가 없습니다. 새로운 항목을 추가해 주세요.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Save FAB for mobile/demo */}
      <button className="fixed bottom-10 right-10 bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center">
        <Save size={24} />
      </button>
    </div>
  );
}
