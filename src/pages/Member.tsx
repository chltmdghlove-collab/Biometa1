import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { labData, Member as MemberType } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import MemberCard from "../components/MemberCard";
import { Helmet } from "react-helmet-async";
import { 
  Award, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Grid,
  Search,
  Globe,
  Compass,
  CheckCircle2,
  History
} from "lucide-react";

type RoleFilter = "all" | "ResearchProfessor" | "PhD" | "Master" | "Undergraduate" | "Alumni";

export default function Member() {
  const [members] = useState<MemberType[]>(labData.members);
  const [activeTab, setActiveTab] = useState<RoleFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Calculate distinct nationalities in our international talent pool
  const uniqueNationalities = Array.from(
    new Set(
      members
        .map((m) => m.country)
        .filter(Boolean)
    )
  ) as string[];

  // Filter based on selectedTab, search term, and selected country flag
  const filteredMembers = members.filter((m) => {
    const matchesTab = activeTab === "all" || m.role === activeTab;
    const matchesCountry = !selectedCountry || m.country === selectedCountry;
    
    const searchString = `${m.name} ${m.englishName || ""} ${m.country || ""} ${m.description || ""} ${m.education?.join(" ") || ""}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    return matchesTab && matchesCountry && matchesSearch;
  });

  // Grouped members for organized rendering
  const researchProfessors = filteredMembers.filter((m) => m.role === "ResearchProfessor");
  const phdStudents = filteredMembers.filter((m) => m.role === "PhD");
  const masterStudents = filteredMembers.filter((m) => m.role === "Master");
  const undergradStudents = filteredMembers.filter((m) => m.role === "Undergraduate");
  const alumniMembers = filteredMembers.filter((m) => m.role === "Alumni");

  // Total counts for global statistics
  const totalProfessors = members.filter((m) => m.role === "ResearchProfessor").length;
  const totalPhD = members.filter((m) => m.role === "PhD").length;
  const totalMaster = members.filter((m) => m.role === "Master").length;
  const totalAlumni = members.filter((m) => m.role === "Alumni").length;

  const filterTabs = [
    { 
      id: "all" as const, 
      koLabel: "전체보기", 
      enLabel: "All", 
      count: members.length, 
      icon: Grid,
      activeBg: "bg-slate-900 text-white shadow-xl ring-slate-900/10"
    },
    { 
      id: "ResearchProfessor" as const, 
      koLabel: "연구교수", 
      enLabel: "Professors", 
      count: members.filter((m) => m.role === "ResearchProfessor").length, 
      icon: Award,
      activeBg: "bg-rose-600 text-white shadow-xl shadow-rose-200 ring-rose-600/10"
    },
    { 
      id: "PhD" as const, 
      koLabel: "박사과정", 
      enLabel: "Ph.D.", 
      count: members.filter((m) => m.role === "PhD").length, 
      icon: GraduationCap,
      activeBg: "bg-emerald-600 text-white shadow-xl shadow-emerald-200 ring-emerald-600/10"
    },
    { 
      id: "Master" as const, 
      koLabel: "석사과정", 
      enLabel: "M.S.", 
      count: members.filter((m) => m.role === "Master").length, 
      icon: BookOpen,
      activeBg: "bg-amber-500 text-white shadow-xl shadow-amber-200 ring-amber-500/10"
    },
    { 
      id: "Undergraduate" as const, 
      koLabel: "학부연구생", 
      enLabel: "Undergrads", 
      count: members.filter((m) => m.role === "Undergraduate").length, 
      icon: Sparkles,
      activeBg: "bg-indigo-600 text-white shadow-xl shadow-indigo-200 ring-indigo-600/10"
    },
    { 
      id: "Alumni" as const, 
      koLabel: "졸업생/동문", 
      enLabel: "Alumni", 
      count: members.filter((m) => m.role === "Alumni").length, 
      icon: History,
      activeBg: "bg-slate-700 text-white shadow-xl shadow-slate-200 ring-slate-700/10"
    },
  ];

  return (
    <div className="section-padding bg-slate-50/40">
      <Helmet>
        <title>Members | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Our Members" 
        subtitle="우리는 다양성을 존중하며 공동의 목표를 향해 협력하는 세계 각국의 정예 인재들로 구성된 글로벌 연구 소사이어티입니다."
      />

      {/* Premium Bento Stats Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          <div className="bg-gradient-to-tr from-rose-500/5 to-transparent border border-rose-100/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-rose-700/80 uppercase tracking-wider">Research Professors</span>
              <span className="p-1 px-1.5 bg-rose-100/40 text-rose-600 rounded-lg"><Award size={15} /></span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-rose-950">{totalProfessors}<span className="text-xs font-semibold ml-1 text-slate-500">명</span></p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">최우수 책임 연구원진</p>
          </div>

          <div className="bg-gradient-to-tr from-emerald-500/5 to-transparent border border-emerald-100/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-emerald-700/80 uppercase tracking-wider">Ph.D. Candidates</span>
              <span className="p-1 px-1.5 bg-emerald-100/40 text-emerald-600 rounded-lg"><GraduationCap size={15} /></span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-emerald-950">{totalPhD}<span className="text-xs font-semibold ml-1 text-slate-500">명</span></p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">혁신적 응용기술 설계 주도</p>
          </div>

          <div className="bg-gradient-to-tr from-amber-500/5 to-transparent border border-amber-100/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-amber-700/80 uppercase tracking-wider">M.S. Students</span>
              <span className="p-1 px-1.5 bg-amber-100/45 text-amber-600 rounded-lg"><BookOpen size={15} /></span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-amber-950">{totalMaster}<span className="text-xs font-semibold ml-1 text-slate-500">명</span></p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">이론과 응용 실험 융합</p>
          </div>

          <div className="bg-gradient-to-tr from-slate-500/5 to-transparent border border-slate-200/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Alumni</span>
              <span className="p-1 px-1.5 bg-slate-100 text-slate-600 rounded-lg"><History size={15} /></span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-950">{totalAlumni}<span className="text-xs font-semibold ml-1 text-slate-500">명</span></p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">글로벌 학계 및 산업 동동문</p>
          </div>

        </div>
      </div>

      {/* Beautiful Interactive Filters block (Tabs + Dynamic Search + Flag Selector) */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* TOP: Search Bar and Category selection in beautiful harmony */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            
            {/* Left side: Category Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest pl-0.5 mb-1">
                <span>연구원 분류 필터 • Select Role Group</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">원하는 연구 직급 그룹을 탭하여 빠르게 전환할 수 있습니다.</p>
            </div>

            {/* Right side: Modern Live Search Bar */}
            <div className="relative w-full lg:max-w-md focus-within:scale-[1.01] transition-transform duration-300">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="이름, 영어이름, 국가명, 연구 키워드로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* MID: Tabs representation */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedCountry(null); // Clear country selection to avoid redundant zero states
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold tracking-tight transition-all duration-300 transform cursor-pointer ${
                    isSelected
                      ? tab.activeBg
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/50"
                  }`}
                >
                  <TabIcon size={14} className={isSelected ? "text-white" : "text-slate-500"} />
                  <span className="flex items-center gap-1.5">
                    <span>{tab.koLabel}</span>
                    <span className="opacity-60 font-semibold text-[10px] md:text-xs">({tab.enLabel})</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold leading-none ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-700"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BOTTOM: Global Country Flags Filter widget */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase text-slate-400 mb-3 pl-1">
              <Compass size={13} className="text-slate-500" />
              <span>글로벌 여권 필터링 • Interactive Passport Filter</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCountry(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !selectedCountry 
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200/60 hover:border-slate-300"
                }`}
              >
                All Countries ({uniqueNationalities.length})
              </button>
              {uniqueNationalities.map((countryName) => {
                const isSelected = selectedCountry === countryName;
                const countOfCountry = members.filter((m) => m.country === countryName).length;
                return (
                  <button
                    key={countryName}
                    onClick={() => setSelectedCountry(isSelected ? null : countryName)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer hover:border-primary/40 ${
                      isSelected 
                        ? "bg-indigo-600 text-white shadow-sm scale-110 ring-2 ring-indigo-500/10" 
                        : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-100"
                    }`}
                  >
                    <span>{countryName}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 font-extrabold"}`}>
                      {countOfCountry}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedCountry && (
              <p className="text-[11px] text-indigo-600 font-bold mt-2.5 pl-1 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>{selectedCountry} 국적 멤버들만 필터링되어 탐색 중입니다.</span>
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Main Members Showcasing area */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        {filteredMembers.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-2xl mx-auto">
            <span className="text-4xl block mb-4" role="img" aria-label="Not found">🔍</span>
            <h4 className="text-lg font-bold text-slate-800 mb-2">조건에 일치하는 연구원이 없습니다</h4>
            <p className="text-sm text-slate-500 mb-6 font-semibold">검색어 철자를 확인하시거나, 국가/역할 필터를 변경해 보세요.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
                setSelectedCountry(null);
              }}
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-primary/10 hover:shadow-lg transition-all cursor-pointer"
            >
              모든 조건 필터링 초기화
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="space-y-16"
            >
              {/* Category 1: Research Professors */}
              {researchProfessors.length > 0 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-4 pb-6"
                >
                  <div className="border-b border-slate-200/80 pb-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                      <span className="p-1.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100/50"><Award size={20} /></span>
                      <span>Research Professors</span> 
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100/60 px-2.5 py-0.5 rounded-full">연구교수 {researchProfessors.length}명</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">연구실의 전문 학술 연구 및 정밀 바이오 기술 과제를 주도적으로 수행하며 핵심 연구 쾌거를 창출하는 고급 연구자진입니다.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {researchProfessors.map((member) => (
                      <div key={member.id} className="h-full">
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Category 2: Ph.D. Course */}
              {phdStudents.length > 0 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-4 pb-6"
                >
                  <div className="border-b border-slate-200/80 pb-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                      <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/50"><GraduationCap size={20} /></span>
                      <span>Ph.D. Course</span> 
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-full">박사과정 {phdStudents.length}명</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">심도 있는 공학 원리와 독창적인 물질 구조 모델링을 연구하며, 학술 연구의 중추로서 혁신 기술의 원형을 개발하는 박사 인재그룹입니다.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {phdStudents.map((member) => (
                      <div key={member.id} className="h-full">
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Category 3: M.S. Course */}
              {masterStudents.length > 0 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-4 pb-6"
                >
                  <div className="border-b border-slate-200/80 pb-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                      <span className="p-1.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/50"><BookOpen size={20} /></span>
                      <span>M.S. Course</span> 
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100/60 px-2.5 py-0.5 rounded-full">석사과정 {masterStudents.length}명</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">정밀 설계 및 바이오 메타물질 실험 역량을 다지고, 실무적이고 융합적인 연구를 충실히 추진하는 역동적인 석사 대학원 연구진입니다.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {masterStudents.map((member) => (
                      <div key={member.id} className="h-full">
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Category 4: Undergraduate Process (Layout is fully dynamic or shows welcome sign when selected/all and empty) */}
              {(activeTab === "all" || activeTab === "Undergraduate") && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-4 pb-6"
                >
                  <div className="border-b border-slate-200/80 pb-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                      <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50"><Sparkles size={18} /></span>
                      <span>Undergraduate Researchers</span> 
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-2.5 py-0.5 rounded-full">학부생 {undergradStudents.length}명</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">연구실의 유수 프로젝트 및 실험 어시스턴트에 참여하며 성장의 발판 마련 및 미래 학문 연구를 준비하는 유망한 학부연구생 과정입니다.</p>
                  </div>
                  
                  {undergradStudents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {undergradStudents.map((member) => (
                        <div key={member.id} className="h-full">
                          <MemberCard member={member} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-indigo-150 bg-gradient-to-tr from-indigo-50/10 via-white to-slate-50/40 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-sm my-4">
                      <span className="text-3xl block mb-3" role="img" aria-label="welcoming">👋</span>
                      <h4 className="text-base font-extrabold text-indigo-950 mb-1.5">학부연구생(Undergrad) 및 인턴 수시 모집 중!</h4>
                      <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed mb-6 font-semibold">
                        Biometamaterials 연구실에서는 생체 모사 메타물질, 신소재 공학, 바이오센서 및 미세 광학 연구에 지적 열정과 호기심을 지닌 용기 있는 학부 연구생 및 인턴을 대환영합니다.
                      </p>
                      <div className="inline-flex justify-center">
                        <a 
                          href="/contact" 
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                        >
                          연구실 지원문의 바로가기 →
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Category 5: Alumni (Shows graduated members) */}
              {alumniMembers.length > 0 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-4 pb-6"
                >
                  <div className="border-b border-slate-200/80 pb-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                      <span className="p-1.5 bg-slate-100 text-slate-600 rounded-xl border border-slate-200/50"><History size={20} /></span>
                      <span>Alumni Members</span> 
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">졸업생/동문 {alumniMembers.length}명</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">학계를 선도하고 글로벌 보건 및 정밀 바이오 산업 기술의 기틀을 다진, 자랑스러운 Biometamaterials 연구실 졸업동문들입니다.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {alumniMembers.map((member) => (
                      <div key={member.id} className="h-full">
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
