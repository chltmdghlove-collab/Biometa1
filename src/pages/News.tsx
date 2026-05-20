import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  labData, 
  getSavedNews, 
  saveNews, 
  getSavedGallery, 
  saveGallery, 
  NewsItem, 
  GalleryItem 
} from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { 
  Calendar, 
  ChevronRight, 
  Camera, 
  FileText, 
  Plus, 
  X, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2, 
  AlertCircle,
  Maximize2
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Preset Unsplash pictures for academic/group photos
const PRESET_IMAGES = [
  {
    name: "연구원 회의 & 세미나",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "단체 협동 & 브레인스토밍",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "정밀 실험 & 학업 현장",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "학회 단체 축하 & 식사",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function News() {
  // Real-time cached lists
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  
  // Modal states for lightbox
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  
  // Creation state
  const [showCreator, setShowCreator] = useState(false);
  const [creatorType, setCreatorType] = useState<"news" | "gallery">("gallery");
  
  // Form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, ".");
  });
  const [content, setContent] = useState("");
  
  // Image handling (Local file or preset option)
  const [imageOption, setImageOption] = useState<"upload" | "preset">("upload");
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(PRESET_IMAGES[0].url);
  const [uploadedBase64, setUploadedBase64] = useState<string>("");
  const [fileDragOver, setFileDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Status reporting
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sync to local component state on mount
  useEffect(() => {
    setNewsList(getSavedNews());
    setGalleryList(getSavedGallery());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("이미지 파일(.jpg, .png, .gif)만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 4.5 * 1024 * 1024) {
      setErrorMsg("파일 크기가 너무 큽니다 (4.5MB 이하만 권장).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedBase64(reader.result);
        setErrorMsg("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDragOver(true);
  };

  const handleDragLeave = () => {
    setFileDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Submit new items
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim()) {
      setErrorMsg("제목을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      setErrorMsg("내용이나 설명을 입력해 주세요.");
      return;
    }

    if (creatorType === "news") {
      const newNewsItem: NewsItem = {
        id: `news_${Date.now()}`,
        title: title.trim(),
        date: date.replace(/-/g, "."),
        content: content.trim()
      };

      const updated = [newNewsItem, ...newsList];
      setNewsList(updated);
      saveNews(updated);
      setSuccessMsg("새로운 뉴스/공지가 성공적으로 등록되었습니다!");
    } else {
      let finalImgUrl = "";
      if (imageOption === "preset") {
        finalImgUrl = selectedPresetUrl;
      } else {
        if (!uploadedBase64) {
          setErrorMsg("단체 사진 파일을 업로드 하거나 아래 예시 사진을 지정해 주세요.");
          return;
        }
        finalImgUrl = uploadedBase64;
      }

      const newGalleryItem: GalleryItem = {
        id: `gallery_${Date.now()}`,
        title: title.trim(),
        date: date.replace(/-/g, "."),
        content: content.trim(),
        image: finalImgUrl
      };

      const updated = [newGalleryItem, ...galleryList];
      setGalleryList(updated);
      saveGallery(updated);
      setSuccessMsg("새로운 단체 갤러리 뉴스가 성공적으로 등록되었습니다!");
    }

    // Reset fields on success
    setTitle("");
    setContent("");
    setUploadedBase64("");
    
    // Auto collapse form after brief period
    setTimeout(() => {
      setShowCreator(false);
      setSuccessMsg("");
    }, 1500);
  };

  // Delete Item helper (For instant client-side management)
  const handleDeleteGallery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 갤러리 포스트를 삭제하시겠습니까?")) {
      const filtered = galleryList.filter((item) => item.id !== id);
      setGalleryList(filtered);
      saveGallery(filtered);
    }
  };

  const handleDeleteNews = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 소식공지 포스트를 삭제하시겠습니까?")) {
      const filtered = newsList.filter((item) => item.id !== id);
      setNewsList(filtered);
      saveNews(filtered);
    }
  };

  return (
    <div className="section-padding bg-white min-h-screen text-slate-800">
      <Helmet>
        <title>News & Gallery | {labData.labName}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <SectionHeader 
            title="News & Gallery" 
            subtitle="생체메타물질 연구실의 최근 공지 사항 및 연구팀 단체 야유회, 워크샵, 학술 강연 등 생동감 넘치는 기록을 모아두는 소통 공간입니다."
          />
          <button
            onClick={() => {
              setShowCreator(!showCreator);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-[#e40428] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md shrink-0"
          >
            <Plus size={15} />
            {showCreator ? "글쓰기 닫기" : "새 포스트 올리기"}
          </button>
        </div>

        {/* Dynamic Photo/News Publisher Expandable Form */}
        <AnimatePresence>
          {showCreator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 lg:p-8 max-w-3xl mx-auto shadow-xl relative">
                <button
                  onClick={() => setShowCreator(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>

                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e40428] animate-pulse" />
                  새로운 콘텐츠 발행하기
                </h3>

                {/* Inline Type Selector inside Creator */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-slate-200 border border-slate-350 rounded-xl max-w-sm">
                  <button
                    type="button"
                    onClick={() => setCreatorType("gallery")}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      creatorType === "gallery" ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    단체 사진첩 (Gallery)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreatorType("news")}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      creatorType === "news" ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    소식 및 공지 (Notice)
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">제목 (Title) *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={creatorType === "gallery" ? "예: 2026 해외 의공학 학회 참석 기념" : "예: 2026 후기 하반기 석박사 세미나 일정 안내"}
                        className="w-full bg-white border border-slate-300 focus:border-[#e40428] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">작성 날짜 *</label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="YYYY.MM.DD"
                        className="w-full bg-white border border-slate-300 focus:border-[#e40428] rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5 uppercase tracking-wider">내용 및 설명 (Content) *</label>
                    <textarea
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={creatorType === "gallery" ? "활동에 대한 설명이나 소감, 참여 인원 등을 기재해 보세요." : "공지사항 상세 항목 및 지원 자격 등을 상세히 기재해 보세요."}
                      className="w-full bg-white border border-slate-300 focus:border-[#e40428] rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {creatorType === "gallery" && (
                    <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <label className="text-xs font-mono text-slate-600 uppercase tracking-wider font-semibold">단체 이미지 선택 방법</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setImageOption("upload")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              imageOption === "upload" ? "bg-slate-900 text-white shadow-sm" : "bg-slate-200 text-slate-600 hover:text-slate-800"
                            }`}
                          >
                            내 사진 올리기
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageOption("preset")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              imageOption === "preset" ? "bg-slate-900 text-white shadow-sm" : "bg-slate-200 text-slate-600 hover:text-slate-800"
                            }`}
                          >
                            견본 사진 채택
                          </button>
                        </div>
                      </div>

                      {imageOption === "upload" ? (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                            fileDragOver 
                              ? "border-[#e40428] bg-rose-50/40" 
                              : uploadedBase64 
                                ? "border-emerald-500 bg-emerald-50" 
                                : "border-slate-300 hover:border-slate-400 bg-white"
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {uploadedBase64 ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative w-40 h-24 rounded overflow-hidden border border-emerald-300 shadow-md">
                                <img src={uploadedBase64} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 size={12} /> 단체 사진 분석 및 로드 완료
                              </span>
                              <span className="text-[10px] text-slate-500">클릭하여 다른 사진으로 대체</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-500">
                              <Upload size={24} className="text-slate-400 mb-1" />
                              <span className="text-xs font-medium">이곳에 멤버 단체 사진을 끌어다 놓거나 <span className="text-[#e40428] underline font-bold">클릭하여 선택</span></span>
                              <span className="text-[10px] text-slate-400">지원모델: JPG, PNG, GIF (최대 4.5MB)</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <span className="text-[10px] text-slate-500 block">원하는 가상 연구팀 사진 선택:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {PRESET_IMAGES.map((preset) => (
                              <button
                                key={preset.name}
                                type="button"
                                onClick={() => setSelectedPresetUrl(preset.url)}
                                className={`group relative aspect-video rounded-lg overflow-hidden border-2 text-left transition-all ${
                                  selectedPresetUrl === preset.url ? "border-[#e40428] scale-[1.02]" : "border-slate-300 hover:border-slate-400"
                                }`}
                              >
                                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" />
                                <span className="absolute bottom-1 right-1 left-1 bg-slate-950/70 p-1 text-[8px] font-bold text-white truncate text-center rounded">
                                  {preset.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback Blocks */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-200 p-3 rounded-lg">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="flex items-center gap-2 text-emerald-600 text-xs bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreator(false)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#e40428] hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all shadow-md"
                    >
                      등록하기 (Upload)
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= SECTION 1: News & Notices ================= */}
        <div className="mb-16 mt-10">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
            <div className="p-2 bg-rose-50 text-[#e40428] rounded-xl">
              <FileText size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">News & Notices</h2>
              <p className="text-xs text-slate-500">연구실 학술 발표, 공지사항 및 최근 소식들입니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item, i) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedNewsItem(item)}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative flex flex-col h-full"
              >
                {/* Instant deletion button client-side */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNews(item.id, e);
                  }}
                  title="삭제"
                  className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 text-slate-700 bg-white/90 hover:text-red-500 p-1.5 rounded-lg border border-slate-200 transition-all shadow-md"
                >
                  <X size={13} />
                </button>

                {/* Card Top: Matching aspect-video aesthetic with stylized notice design */}
                <div className="relative aspect-video overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-slate-100/50" />
                  
                  {/* Styled central visual icon */}
                  <div className="relative flex flex-col items-center gap-1.5 z-10 text-center px-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#e40428] flex items-center justify-center border border-[#e40428]/10 group-hover:scale-[1.08] transition-transform duration-500">
                      <FileText size={18} />
                    </div>
                    <span className="text-[9px] font-mono font-black text-[#e40428]/80 tracking-widest uppercase">LAB NOTICE</span>
                  </div>

                  {/* Subtle Interactive Signal HUD hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300 z-10">
                    <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-slate-900 border border-slate-200 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      <Maximize2 size={10} className="text-[#e40428]" /> 크게 보기 (Click)
                    </span>
                  </div>
                </div>

                {/* Card details body elements */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e40428]" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#e40428] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs font-light leading-relaxed line-clamp-3 whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-slate-600 tracking-wider">
                    <span className="font-mono">BIOMETAMATERIALS NEWS</span>
                    <span className="text-[#e40428] font-bold flex items-center">자세히보기</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {newsList.length === 0 && (
              <div className="col-span-full text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                등록된 연구실 소식이 없습니다. 우측 상단의 '새 포스트 올리기'를 클릭해 공지사항을 작성해 보세요.
              </div>
            )}
          </div>
        </div>

        {/* Elegant Separator */}
        <div className="w-full h-[1px] bg-slate-100 my-12" />

        {/* ================= SECTION 2: Lab Gallery ================= */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
            <div className="p-2 bg-rose-50 text-[#e40428] rounded-xl">
              <Camera size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Lab Gallery</h2>
              <p className="text-xs text-slate-500">생체메타물질 연구실 학생 단체 활동 사진첩입니다. (클릭 시 확대)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryList.map((item, i) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative flex flex-col h-full"
              >
                {/* Delete button wrapper for management */}
                <button
                  onClick={(e) => handleDeleteGallery(item.id, e)}
                  title="삭제"
                  className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 text-slate-700 bg-white/90 hover:text-red-500 p-1.5 rounded-lg border border-slate-200 transition-all shadow-md"
                >
                  <X size={13} />
                </button>

                {/* Card Top visual image wrapper */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Subtle Interactive Signal HUD hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-300 z-10">
                    <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-slate-900 border border-slate-200 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      <Maximize2 size={10} className="text-[#e40428]" /> 크게 보기 (Click)
                    </span>
                  </div>
                </div>

                {/* Card details body elements */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e40428]" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#e40428] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs font-light leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-slate-600 tracking-wider">
                    <span className="font-mono">BIOMETAMATERIALS LAB</span>
                    <span className="text-[#e40428] font-bold flex items-center">자세히보기</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {galleryList.length === 0 && (
              <div className="col-span-full text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                등록된 단체 활동 사진이 없습니다. 우측 상단의 '새 포스트 올리기'를 클릭해 아름다운 추억을 공유해 보세요.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox modal zoom viewing */}
      <AnimatePresence>
        {selectedNewsItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNewsItem(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
            >
              {/* Close Button element */}
              <button
                onClick={() => setSelectedNewsItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/10 hover:bg-[#e40428] text-slate-800 hover:text-white transition-colors flex items-center justify-center border border-slate-200 shadow-sm"
              >
                <X size={15} />
              </button>

              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-2 text-[#e40428] mb-4 bg-rose-50 px-3 py-1 rounded-full w-fit">
                  <FileText size={14} className="text-[#e40428]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#e40428]">{selectedNewsItem.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 leading-tight border-b border-slate-100 pb-4">
                  {selectedNewsItem.title}
                </h3>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light max-h-[320px] overflow-y-auto pr-2">
                  {selectedNewsItem.content}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] font-mono text-slate-400">
                  <div>
                    <p>ORGANIZATION: Biometamaterials Lab</p>
                    <p>PUBLISHED BY: Yonsei Univ. precision medical technology</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[#e40428] font-bold">
                    <span>#학술세미나</span>
                    <span>#공지사항</span>
                    <span>#연세대학교</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryItem(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
            >
              {/* Close Button element */}
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/10 hover:bg-[#e40428] text-slate-800 hover:text-white transition-colors flex items-center justify-center border border-slate-200 shadow-sm"
              >
                <X size={15} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left side: High-res group photo display */}
                <div className="md:col-span-8 aspect-video md:aspect-auto md:h-[480px] bg-slate-950 flex items-center justify-center">
                  <img
                    src={selectedGalleryItem.image}
                    alt={selectedGalleryItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right side: Detailed captions and descriptions */}
                <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 text-[#e40428] mb-4">
                      <Camera size={14} />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest">{selectedGalleryItem.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 leading-tight">
                      {selectedGalleryItem.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light">
                      {selectedGalleryItem.content}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 space-y-1 text-[10px] font-mono text-slate-400">
                    <p>ORGANIZATION: Biometamaterials Lab</p>
                    <p>FIELD: Precision Medicine Group</p>
                    <div className="flex flex-wrap gap-2 text-[#e40428] font-bold mt-2">
                      <span>#연구원</span>
                      <span>#의공학과</span>
                      <span>#바이오메타물질</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
