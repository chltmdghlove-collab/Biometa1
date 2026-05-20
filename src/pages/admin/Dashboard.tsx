import React, { useState, useEffect } from "react";
import { 
  labData, 
  getSavedNews, 
  saveNews, 
  getSavedGallery, 
  saveGallery, 
  NewsItem, 
  GalleryItem 
} from "../../data/mockData";
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Newspaper, 
  BookOpen, 
  Camera, 
  X, 
  CheckCircle,
  FileImage,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'news' | 'gallery' | 'pubs'>('news');
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  // Create state models
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, ".");
  });
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");
  
  // Notice / publications states (local read/write)
  const [localPubs, setLocalPubs] = useState(() => {
    const stored = localStorage.getItem("lab_pubs");
    return stored ? JSON.parse(stored) : [...labData.publications];
  });

  const loadData = () => {
    if (activeTab === 'news') {
      setItems(getSavedNews());
    } else if (activeTab === 'gallery') {
      setItems(getSavedGallery());
    } else if (activeTab === 'pubs') {
      setItems(localPubs);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
      return;
    }
    loadData();
  }, [activeTab, navigate, localPubs]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const handleDeleteItem = (id: string) => {
    if (!window.confirm("이 항목을 정말 삭제하시겠습니까?")) return;

    if (activeTab === 'news') {
      const current = getSavedNews();
      const updated = current.filter(item => item.id !== id);
      saveNews(updated);
      setItems(updated);
    } else if (activeTab === 'gallery') {
      const current = getSavedGallery();
      const updated = current.filter(item => item.id !== id);
      saveGallery(updated);
      setItems(updated);
    } else if (activeTab === 'pubs') {
      const updated = localPubs.filter((item: any) => item.id !== id);
      setLocalPubs(updated);
      localStorage.setItem("lab_pubs", JSON.stringify(updated));
      setItems(updated);
    }
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert("모든 필수 항목을 기입해 주십시오.");
      return;
    }

    if (activeTab === 'news') {
      const newItem: NewsItem = {
        id: `news_${Date.now()}`,
        title: newTitle.trim(),
        date: newDate.replace(/-/g, "."),
        content: newContent.trim()
      };
      const updatedList = [newItem, ...getSavedNews()];
      saveNews(updatedList);
      setItems(updatedList);
    } else if (activeTab === 'gallery') {
      const imgUrl = newImage.trim() || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200";
      const newItem: GalleryItem = {
        id: `gallery_${Date.now()}`,
        title: newTitle.trim(),
        date: newDate.replace(/-/g, "."),
        content: newContent.trim(),
        image: imgUrl
      };
      const updatedList = [newItem, ...getSavedGallery()];
      saveGallery(updatedList);
      setItems(updatedList);
    } else if (activeTab === 'pubs') {
      const newItem = {
        id: `pub_${Date.now()}`,
        title: newTitle.trim(),
        year: parseInt(newDate.substring(0, 4)) || 2026,
        authors: "Biometamaterials Lab Group",
        journal: newContent.trim()
      };
      const updatedList = [newItem, ...localPubs];
      setLocalPubs(updatedList);
      localStorage.setItem("lab_pubs", JSON.stringify(updatedList));
      setItems(updatedList);
    }

    // Reset clean
    setNewTitle("");
    setNewContent("");
    setNewImage("");
    setIsModalOpen(false);
  };

  return (
    <div className="section-padding bg-slate-950/40 min-h-screen text-slate-100">
      <Helmet>
        <title>Admin Dashboard | Biometamaterials Lab</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            Admin Panel
          </h1>
          <p className="text-slate-400 font-light mt-1">실시간 연구실 콘텐츠 갱신 및 데이터베이스 관리자 센터</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/news")}
            className="text-xs font-bold text-slate-300 hover:text-[#e40428] transition-colors bg-slate-900 border border-white/5 px-4 py-2.5 rounded-xl"
          >
            홈페이지 소식란 가기
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center text-xs font-bold text-slate-300 hover:text-[#e40428] transition-colors bg-slate-900 border border-white/5 px-4 py-2.5 rounded-xl"
          >
            <LogOut size={14} className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2.5">
          {[
            { id: 'news', label: '공지사항 관리', icon: <Newspaper size={18} /> },
            { id: 'gallery', label: '학생 단체사진 관리', icon: <Camera size={18} /> },
            { id: 'pubs', label: '논문 목록 관리', icon: <BookOpen size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center p-4 rounded-2xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === item.id 
                ? "bg-[#e40428] text-white shadow-xl shadow-rose-950/40" 
                : "bg-slate-900 border border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/20">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                {activeTab === 'news' ? '공지사항 (News & Notice)' : activeTab === 'gallery' ? '단체 사진 (Lab Gallery)' : '논문 (Publications)'} 관리 목록
              </h2>
              <p className="text-slate-500 text-[11px] mt-0.5">총 {items.length}개 발견됨</p>
            </div>
            
            <button 
              onClick={() => {
                const today = new Date();
                setNewDate(today.toISOString().split("T")[0].replace(/-/g, "."));
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-[#e40428] hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center"
            >
              <Plus size={14} className="mr-1" /> 새 항목 등록
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950/40 border-b border-white/5 text-slate-400 text-[10px] font-mono uppercase tracking-widest">
                  <th className="px-8 py-4">제목 및 내용 요약</th>
                  <th className="px-8 py-4">날짜 / 연원</th>
                  <th className="px-8 py-4 text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {activeTab === 'gallery' && (
                          <div className="w-8 h-6 rounded bg-slate-950 overflow-hidden shrink-0 border border-white/10">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="line-clamp-1">{item.title || item.name}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {item.journal || item.description || item.content}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-block px-2 py-0.5 bg-slate-950 text-slate-400 text-[10px] font-mono rounded">
                        {item.date || item.role || item.year}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {items.length === 0 && (
              <div className="p-20 text-center text-slate-500 font-light text-sm">
                저장된 데이터 항목이 없습니다. 우상단 '새 항목 등록'을 통해 작성해 보세요.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Creation Modal Overlays */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e40428]" />
              {activeTab === 'news' ? '새 공지사항 올리기' : activeTab === 'gallery' ? '단체 사진 추가하기' : '논문 실적 추가하기'}
            </h3>

            <form onSubmit={handleCreateItem} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">제목 (Title) *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="제목 입력"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e40428] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">날짜 / 년학기 *</label>
                  <input
                    type="text"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="YYYY.MM.DD 또는 YYYY"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e40428] transition-colors"
                  />
                </div>
                {activeTab === 'gallery' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">사진 URL (선택)</label>
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="기본 이미지 자동 배포"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e40428] transition-colors"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">내용 / 학술지 상세 내용 *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={activeTab === 'pubs' ? "예: Nature Communications, vol. 18, pp. 24" : "소개할 설명 글 기입"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#e40428] transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e40428] hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  저장 및 배포
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
