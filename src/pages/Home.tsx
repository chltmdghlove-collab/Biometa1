import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Beaker, Users, FileText, ExternalLink, Star, BarChart3, TrendingUp, Award, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { labData } from "../data/mockData";
import { Helmet } from "react-helmet-async";
import ResearchSlides from "../components/ResearchSlides";
import BiometamaterialVisualizer from "../components/BiometamaterialVisualizer";

export default function Home() {
  const [showPubStats, setShowPubStats] = useState(false);
  const [showMemberStats, setShowMemberStats] = useState(false);

  const totalPublications = labData.publications.length;
  const totalMembers = labData.members.length;

  // Compute dynamic stats from the data
  const yearCounts = labData.publications.reduce((acc: Record<number, number>, pub) => {
    acc[pub.year] = (acc[pub.year] || 0) + 1;
    return acc;
  }, {});

  const journalCounts = labData.publications.reduce((acc: Record<string, number>, pub) => {
    // Grab key journal name prefix (clean representation, e.g. "Nature Communications" or "Sensors")
    const mainJournal = pub.journal.split(",")[0].trim();
    acc[mainJournal] = (acc[mainJournal] || 0) + 1;
    return acc;
  }, {});

  // Sort and take top journals
  const topJournals = Object.entries(journalCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const featuredCount = labData.publications.filter(p => p.isSelected).length;
  const recentYears = [2026, 2025, 2024, 2023, 2022];

  // Compute dynamic member stats from the data
  const totalProfessors = labData.members.filter((m) => m.role === "ResearchProfessor").length;
  const totalPhD = labData.members.filter((m) => m.role === "PhD").length;
  const totalMaster = labData.members.filter((m) => m.role === "Master").length;
  const totalUndergrad = labData.members.filter((m) => m.role === "Undergraduate").length;
  const totalAlumni = labData.members.filter((m) => m.role === "Alumni").length;

  // Count countries represented by members
  const countriesList = Array.from(
    new Set(labData.members.map((m) => m.country).filter(Boolean))
  ) as string[];
  const totalCountries = countriesList.length;

  return (
    <>
      <Helmet>
        <title>{labData.vision} | {labData.labName}</title>
        <meta name="description" content={labData.subtitle} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:h-[90vh] flex items-center overflow-hidden bg-[#070b14] py-12 lg:py-0">
        {/* Deep science background with dynamic grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#070b14] to-[#04060b] opacity-90"></div>
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-12" 
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Vision & Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 flex flex-col justify-center text-left relative z-10"
            >
              <div className="inline-block self-start px-3 py-1 bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 rounded-xs">
                Welcome to Biometamaterials Lab
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[53px] font-bold text-white leading-tight mb-8">
                BIOMETAMATERIALS FOR PRECISION MEDICINE
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-slate-300/90 mb-10 leading-relaxed font-light max-w-2xl">
                {labData.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary flex items-center">
                  연구생 지원하기 <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link to="/research" className="px-6 py-3 border border-white/20 text-white rounded-md font-medium hover:bg-white/10 transition-all">
                  연구 분야 보기
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D visualizer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 w-full lg:w-[120%] lg:max-w-none h-[432px] sm:h-[540px] lg:h-[624px] relative rounded-2xl overflow-hidden bg-transparent lg:translate-x-10 xl:translate-x-16 z-0"
            >
              <BiometamaterialVisualizer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Publications Section */}
      <section className="section-padding bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary"></span>
                Selected Publications
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Research Highlights</h2>
              <p className="text-slate-500 font-light text-sm">
                Nature Communications를 포함한 글로벌 최고 권위의 저널에 게재된 Biometamaterials 연구실의 대표 논문들입니다.
              </p>
            </div>
            <Link to="/publication" className="text-primary font-bold flex items-center group text-sm">
              View All Publications <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labData.publications.filter(p => p.isSelected).slice(0, 6).map((pub, i) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100/80 shadow-xs hover:shadow-md hover:border-slate-200/50 transition-all duration-300 flex flex-col h-full"
              >
                {pub.image ? (
                  <div className="aspect-[16/11] w-full overflow-hidden relative border-b border-slate-100 bg-white">
                    <img 
                      src={pub.image} 
                      alt={pub.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/11] w-full bg-white flex items-center justify-center text-slate-300 border-b border-slate-100">
                    <Star size={36} className="opacity-40" />
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {pub.journal}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">{pub.year}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium italic mb-6 line-clamp-2 leading-relaxed">
                      {pub.authors}
                    </p>
                  </div>
                  {pub.link && (
                    <div className="flex justify-start">
                      <a 
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-primary transition-colors group/link"
                      >
                        VIEW PUBLICATION 
                        <ExternalLink size={12} className="ml-1.5 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
            {[
              { 
                label: "Publications", 
                value: `${totalPublications}`, 
                icon: <FileText size={20} className="text-primary" />,
                isInteractive: true,
                isActive: showPubStats,
                badge: showPubStats ? "Close stats" : "View stats breakdown",
                toggle: () => {
                  setShowPubStats(!showPubStats);
                  setShowMemberStats(false);
                }
              },
              { 
                label: "Members", 
                value: `${totalMembers}`, 
                icon: <Users size={20} className="text-primary" />,
                isInteractive: true,
                isActive: showMemberStats,
                badge: showMemberStats ? "Close stats" : "View member statistics",
                toggle: () => {
                  setShowMemberStats(!showMemberStats);
                  setShowPubStats(false);
                }
              },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={stat.toggle}
                className="flex items-center justify-between p-4 rounded-2xl cursor-pointer hover:bg-slate-50/80 hover:shadow-xs group transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-xs transition-all">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 flex items-center gap-1.5 focus:outline-none">
                      {stat.value}
                      <span className="text-primary/75 group-hover:translate-y-0.5 transition-transform duration-200">
                        {stat.isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-primary font-bold tracking-tight bg-slate-50 group-hover:bg-primary/5 px-2 py-1 rounded-md transition-all select-none">
                  {stat.badge}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Collapsible dynamic simple stats visualization box for Publications */}
          <AnimatePresence>
            {showPubStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden border border-slate-100/90 rounded-2xl bg-slate-50/40 p-6 md:p-8 mt-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stat Card 1: Yearly Trend */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      Yearly Publication Trend
                    </h4>
                    <div className="space-y-3">
                      {recentYears.map((year) => {
                        const count = yearCounts[year] || 0;
                        const percent = totalPublications > 0 ? (count / 10) * 100 : 0; // scaled for presentation
                        return (
                          <div key={year} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{year}년</span>
                              <span className="font-extrabold text-slate-955">{count}편</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(percent, 100)}%` }}
                                transition={{ duration: 0.65 }}
                                className="h-full bg-primary rounded-full" 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stat Card 2: Highest Journal Placements */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Award size={14} className="text-primary" />
                      Key Scientific Journals
                    </h4>
                    <div className="space-y-3">
                      {topJournals.map(([journal, count], index) => {
                        const percentage = ((count / totalPublications) * 100).toFixed(1);
                        return (
                          <div key={journal} className="flex justify-between items-center text-xs text-slate-705 p-1 px-1.5 hover:bg-slate-50 rounded-lg transition-all font-sans">
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center font-bold text-slate-500 font-mono text-[10px]">
                                0{index + 1}
                              </span>
                              <span className="font-semibold truncate text-slate-800" title={journal}>{journal}</span>
                            </div>
                            <span className="font-extrabold text-primary shrink-0 bg-primary/5 px-2 py-0.5 rounded-full text-[11px]">{count}편</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stat Card 3: Quality Index & Analysis */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-primary" />
                        Scientific Impact Metric
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                        자연계 모사 및 바이오 메타물질, 다학제 신소재 기술을 선도하며, Nature Communications와 Advanced Science 등의 최고 주류 저널에 다수 게재되었습니다.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Featured Papers</span>
                        <span className="text-lg font-extrabold text-slate-800">{featuredCount} / {totalPublications}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Avg/Year (Selected)</span>
                        <span className="text-lg font-extrabold text-slate-850">4.8 <span className="text-xs font-semibold text-slate-440">평균</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsible dynamic simple stats visualization box for Members */}
          <AnimatePresence>
            {showMemberStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden border border-slate-100/90 rounded-2xl bg-slate-50/40 p-6 md:p-8 mt-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stat Card 1: Laboratory Composition */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Users size={14} className="text-primary" />
                      Laboratory Composition
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: "Research Professors", count: totalProfessors, color: "bg-rose-500" },
                        { label: "Ph.D. Candidates", count: totalPhD, color: "bg-emerald-500" },
                        { label: "M.S. Students", count: totalMaster, color: "bg-amber-500" },
                        { label: "Undergrad Researchers", count: totalUndergrad, color: "bg-indigo-500" },
                        { label: "Alumni Network", count: totalAlumni, color: "bg-slate-500" }
                      ].filter(role => role.count > 0 || role.label.includes("Ph.D") || role.label.includes("M.S")).map((role) => {
                        const percent = totalMembers > 0 ? (role.count / totalMembers) * 100 : 0;
                        return (
                          <div key={role.label} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                              <span>{role.label}</span>
                              <span className="font-extrabold text-slate-955">{role.count}명</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 0.65 }}
                                className={`h-full ${role.color} rounded-full`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stat Card 2: International Diversity */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5 font-sans">
                      <Award size={14} className="text-primary" />
                      International Talent Pool
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                      글로벌 지식 사회에서 시너지를 발휘하기 위해 전 세계에서 모인 다양한 국가의 인재들로 구성되어 있습니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {countriesList.map((country) => (
                        <span 
                          key={country} 
                          className="px-2.5 py-1 bg-slate-50 text-[11px] font-bold text-slate-600 border border-slate-100 rounded-lg flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stat Card 3: Research Engagement Metric */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-primary" />
                        Active Talent & Impact
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                        다학제 융합 연구 플랫폼인 Biometamaterials 연구실은 전공 생물, 나노광학, 전자기학, 머신러닝 등을 결합하여 실질적인 사회 가치를 탐구하는 역사를 이어가고 있습니다.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Nationalities</span>
                        <span className="text-lg font-extrabold text-slate-800">{totalCountries}개국</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Active Researchers</span>
                        <span className="text-lg font-extrabold text-slate-850">
                          {totalProfessors + totalPhD + totalMaster + totalUndergrad}명
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Research */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary"></span>
                Research Fields
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Research Fields</h2>
              <p className="text-slate-500">우리는 생명과학과 재료공학의 교차점에서 새로운 가능성을 탐구합니다.</p>
            </div>
            <Link to="/research" className="text-primary font-bold flex items-center group text-sm">
              View All Research <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labData.researchFields.map((field, i) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl aspect-[4/5]"
              >
                {field.image && (
                  field.image.toLowerCase().endsWith('.mov') || 
                  field.image.toLowerCase().endsWith('.mp4') || 
                  field.image.toLowerCase().endsWith('.webm') || 
                  field.image.toLowerCase().includes('.mov?') || 
                  field.image.toLowerCase().includes('.mp4?') || 
                  field.image.toLowerCase().includes('meta.mov')
                ) ? (
                  <video 
                    src={field.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={field.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={field.title} 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{field.title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {field.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Slides Section */}
      <ResearchSlides />

      {/* Careers & Recruitment Section */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Column */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary"></span>
                Join Our Team
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Careers & Recruitment
                <span className="block text-slate-500 text-lg font-normal mt-2">
                  생명과학과 재료공학의 미래를 새롭게 써 내려갈 우수한 인재분들의 연락을 기다립니다.
                </span>
              </h2>
            </div>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-all active:scale-95 flex items-center group shadow-sm hover:shadow"
            >
              연구실 지원문의 바로가기 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Graduate Program Track Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 hover:bg-white p-8 md:p-10 rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">대학원생 모집 (석사·박사 과정)</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  생체 모사 메타물질, 신소재 설계, 광학 및 센서 분야에서 세계적인 학술 성과를 일구어낼 대학원 과정 신입생을 상시 모집합니다. 등록금 전액 지원 및 연구 장려금 등 최고의 혜택을 제공합니다.
                </p>
              </div>
            </motion.div>

            {/* Undergraduate Track Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 hover:bg-white p-8 md:p-10 rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Beaker size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">학부연구생 & 인턴 과정</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  실제 연구 장비를 경험하고 수준 높은 학술 프로젝트에 직간접적으로 참여하며, 학문적 깊이와 미래 핵심 연구역량을 조기에 배양할 용기 있는 학부생 및 인턴을 대환영합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
