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
  List,
  Search,
  Globe2,
  Compass,
  CheckCircle2,
  History,
  X,
  Mail,
  ArrowRight,
  ChevronRight,
  User
} from "lucide-react";

type RoleFilter = "all" | "ResearchProfessor" | "PhD" | "Master" | "Undergraduate" | "Alumni";
type ViewMode = "grid" | "list";

export default function Member() {
  const [members] = useState<MemberType[]>(labData.members);
  const [activeTab, setActiveTab] = useState<RoleFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

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

  // Grouped members for organized rendering (used in Grid/List groupings)
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

  const roleLabels: Record<string, string> = {
    ResearchProfessor: "Research Professor",
    PhD: "Ph.D. Course",
    Master: "M.S. Course",
    Undergraduate: "Undergrad Researcher",
    Alumni: "Alumni"
  };

  const getInitials = (name: string) => {
    const cleanName = name.replace(/[,/].*$/, "").trim();
    const parts = cleanName.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="section-padding bg-slate-50/40 relative min-h-screen">
      <Helmet>
        <title>Members | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Our Members" 
        subtitle="We are a global research society composed of talents from around the world who respect diversity and work together toward shared goals, while actively recruiting international students to globalize our research team and strengthen its global competitiveness."
      />


      {/* Beautiful Interactive Filters block (Tabs + Dynamic Search + View Mode Switcher + Passport Selector) */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* TOP: Search Bar and Category selection in beautiful harmony + View Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            
            {/* Left side: Category Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest pl-0.5 mb-1">
                <span>연구원 분류 필터 • Select Role Group</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">원하는 직급을 선택하거나 우측에서 보기 형식을 변경해 보세요.</p>
            </div>

            {/* Right side: Modern Live Search Bar & View Mode Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:max-w-xl">
              {/* Live Search */}
              <div className="relative flex-grow focus-within:scale-[1.01] transition-transform duration-300">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="이름, 영어이름, 국가명, 연구내용으로 실시간 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all text-slate-800 placeholder-slate-400"
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

              {/* View Mode Switcher */}
              <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200/50 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-400 hover:text-slate-600"}`}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-400 hover:text-slate-600"}`}
                  title="Academic List View"
                >
                  <List size={16} />
                </button>
              </div>
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
                    isSelected ? "bg-white/25 text-white" : "bg-slate-200/80 text-slate-700"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BOTTOM: Global Country Flags Filter widget */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/80">
            <div className="flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase text-slate-400 mb-3 pl-1">
              <Compass size={13} className="text-slate-500" />
              <span>글로벌 여권 필터링 • Interactive Passport Filter</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedCountry(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !selectedCountry 
                    ? "bg-indigo-600 text-white shadow-sm"
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
                    <span className={`text-[9.5px] px-1 py-0.2 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 font-extrabold"}`}>
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
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-indigo-600 transition-all cursor-pointer"
            >
              모든 조건 필터링 초기화
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {viewMode === "grid" ? (
              <motion.div layout className="space-y-16">
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
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <span className="p-1.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100/50"><Award size={20} /></span>
                        <span>Research Professors</span> 
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100/60 px-2.5 py-0.5 rounded-full">연구교수 {researchProfessors.length}명</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">연구실의 전문 학술 연구 및 정밀 바이오 기술 과제를 주도적으로 수행하며 핵심 연구 쾌거를 창출하는 고급 연구자진입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {researchProfessors.map((member) => (
                        <div key={member.id} className="h-full">
                          <MemberCard member={member} onClick={() => setSelectedMember(member)} />
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
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/50"><GraduationCap size={20} /></span>
                        <span>Ph.D. Course</span> 
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-full">박사과정 {phdStudents.length}명</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">심도 있는 공학 원리와 독창적인 물질 구조 모델링을 연구하며, 학술 연구의 중추로서 혁신 기술의 원형을 개발하는 박사 인재그룹입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {phdStudents.map((member) => (
                        <div key={member.id} className="h-full">
                          <MemberCard member={member} onClick={() => setSelectedMember(member)} />
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
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <span className="p-1.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/50"><BookOpen size={20} /></span>
                        <span>M.S. Course</span> 
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100/60 px-2.5 py-0.5 rounded-full">석사과정 {masterStudents.length}명</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">정밀 설계 및 바이오 메타물질 실험 역량을 다지고, 실무적이고 융합적인 연구를 충실히 추진하는 역동적인 석사 대학원 연구진입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {masterStudents.map((member) => (
                        <div key={member.id} className="h-full">
                          <MemberCard member={member} onClick={() => setSelectedMember(member)} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Category 4: Undergraduate Process */}
                {(activeTab === "all" || activeTab === "Undergraduate") && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="pt-4 pb-6"
                  >
                    <div className="border-b border-slate-200/80 pb-4 mb-8">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
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
                            <MemberCard member={member} onClick={() => setSelectedMember(member)} />
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

                {/* Category 5: Alumni */}
                {alumniMembers.length > 0 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="pt-4 pb-6"
                  >
                    <div className="border-b border-slate-200/80 pb-4 mb-8">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <span className="p-1.5 bg-slate-100 text-slate-600 rounded-xl border border-slate-200/50"><History size={20} /></span>
                        <span>Alumni Members</span> 
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">졸업생/동문 {alumniMembers.length}명</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 font-semibold leading-relaxed">학계를 선도하고 글로벌 보건 및 정밀 바이오 산업 기술의 기틀을 다진, 자랑스러운 Biometamaterials 연구실 졸업동문들입니다.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {alumniMembers.map((member) => (
                        <div key={member.id} className="h-full">
                          <MemberCard member={member} onClick={() => setSelectedMember(member)} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* --- EXQUISITE ACADEMIC LIST DIRECTORY VIEW MODE --- */
              <motion.div 
                layout 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-slate-150/60 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-100"
              >
                {/* Table Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 text-[11px] font-black tracking-widest text-slate-400 uppercase select-none">
                  <div className="col-span-5 flex items-center gap-2">Name & Role</div>
                  <div className="col-span-2">Nationality</div>
                  <div className="col-span-4">Academic Background & Education</div>
                  <div className="col-span-1 text-right">Details</div>
                </div>

                {/* Directory Content Row mapping */}
                {filteredMembers.map((member) => {
                  const hasImage = member.image && !member.image.endsWith(".jpg") && member.image.includes("/");
                  return (
                    <motion.div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 md:px-8 py-5 hover:bg-slate-50/75 transition-all cursor-pointer group"
                    >
                      {/* Name Card Section */}
                      <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-slate-100/85 border border-slate-200/50 flex items-center justify-center">
                          {hasImage ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-[11px] font-black tracking-tight text-slate-500">{getInitials(member.name)}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-none">
                              {member.name}
                            </h4>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded border border-slate-200/30">
                              {roleLabels[member.role] || member.role}
                            </span>
                          </div>
                          {member.englishName && (
                            <span className="text-[10px] text-slate-400 font-medium block mt-1">{member.englishName}</span>
                          )}
                        </div>
                      </div>

                      {/* Nationality Tag */}
                      <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <Globe2 size={12} className="text-slate-400" />
                          {member.country || "Korea"}
                        </span>
                      </div>

                      {/* Education row info */}
                      <div className="col-span-1 md:col-span-4 text-xs text-slate-500 leading-relaxed font-light">
                        {member.education && member.education.length > 0 ? (
                          <span className="truncate block max-w-sm" title={member.education.join(", ")}>
                            {member.education.join(" • ")}
                          </span>
                        ) : (
                          <span className="text-slate-300 italic">No record</span>
                        )}
                      </div>

                      {/* CTA Right Indicator */}
                      <div className="col-span-1 md:col-span-1 text-right flex justify-end">
                        <span className="p-1 px-1.5 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* --- EXQUISITE GLASSMORPHIC PROFILE DRAWER/MODAL INTERACTION --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            />

            {/* Profile Content container card with scale transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="bg-white rounded-3xl border border-slate-150 shadow-2xl relative z-10 w-full max-w-xl overflow-hidden"
            >
              {/* Top Banner Color block based on role */}
              <div className={`h-2.5 w-full ${
                selectedMember.role === "ResearchProfessor" ? "bg-rose-500" :
                selectedMember.role === "PhD" ? "bg-emerald-500" :
                selectedMember.role === "Master" ? "bg-amber-400" :
                selectedMember.role === "Undergraduate" ? "bg-indigo-500" : "bg-slate-500"
              }`} />

              {/* Close Button element */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-slate-50/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full border border-slate-200/40 cursor-pointer transition-all z-20"
              >
                <X size={15} />
              </button>

              <div className="p-8 md:p-10 pointer-events-auto">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-8 mb-6">
                  {/* Miniature Portrait Frame */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100/50 border border-slate-200/40 flex-shrink-0 flex items-center justify-center shadow-inner relative">
                    {selectedMember.image && !selectedMember.image.endsWith(".jpg") ? (
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-3xl font-black text-slate-400 tracking-tight">{getInitials(selectedMember.name)}</span>
                    )}
                  </div>

                  {/* High level profile description metadata */}
                  <div className="text-center sm:text-left flex-grow">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md leading-none">
                        {roleLabels[selectedMember.role] || selectedMember.role}
                      </span>
                      {selectedMember.country && (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                          <Globe2 size={10} />
                          {selectedMember.country}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-1">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold tracking-wide mb-3">{selectedMember.englishName}</p>

                    {selectedMember.description && (
                      <p className="text-xs text-slate-500 leading-relaxed max-w-md italic font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                        "{selectedMember.description}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-profiles details layout */}
                <div className="space-y-6">
                  {/* Academic Profile & Timeline */}
                  <div>
                    <h4 className="text-[10.5px] font-black tracking-wider text-slate-450 uppercase mb-3 flex items-center gap-1.5">
                      <GraduationCap size={15} className="text-slate-400" />
                      <span>ACADEMIC BACKGROUND & TIMELINE</span>
                    </h4>
                    {selectedMember.education && selectedMember.education.length > 0 ? (
                      <div className="relative border-l border-slate-100 pl-4 ml-2.5 py-1 space-y-4">
                        {selectedMember.education.map((edu, idx) => (
                          <div key={idx} className="relative">
                            {/* Bullet icon indicator */}
                            <span className="absolute -left-[20.5px] top-1.5 w-2 h-2 rounded-full border border-white bg-slate-400 ring-4 ring-white" />
                            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                              {edu}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">등록된 학력 사항 정보가 없습니다.</p>
                    )}
                  </div>

                  {/* Fellowship / Funding Programs if present */}
                  {selectedMember.fellowship && (
                    <div className="p-4 bg-indigo-50/40 border border-indigo-100/30 rounded-2xl">
                      <h4 className="text-[10px] font-black tracking-widest text-indigo-750 uppercase mb-1">FELLOWSHIP & SPONSORSHIP</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">{selectedMember.fellowship}</p>
                    </div>
                  )}

                  {/* Direct interactive actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    {selectedMember.email ? (
                      <a 
                        href={`mailto:${selectedMember.email}`}
                        className="w-full sm:flex-1 py-3 bg-slate-900 border border-slate-900 hover:bg-primary hover:border-primary text-white rounded-xl text-center text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                      >
                        <Mail size={14} />
                        CONTACT EMAIL SEND
                      </a>
                    ) : (
                      <div className="w-full sm:flex-1 py-3 bg-slate-50 border border-slate-250/20 text-slate-400 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                        <Mail size={14} />
                        NO EMAIL PROVIDED
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                    >
                      창 닫기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
