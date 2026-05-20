import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { ExternalLink, Star, Filter, RefreshCw } from "lucide-react";
import { Helmet } from "react-helmet-async";
import KeywordBubbleCloud, { TOPIC_TEMPLATES, getPublicationImpactFactor } from "../components/KeywordBubbleCloud";

export default function Publication() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Filter publications reactively under chosen keyword topic pattern
  const filteredPublications = selectedKeyword
    ? labData.publications.filter((pub) => {
        const topic = TOPIC_TEMPLATES.find((t) => t.id === selectedKeyword);
        if (!topic) return true;
        const title = pub.title.toLowerCase();
        const journal = pub.journal ? pub.journal.toLowerCase() : "";
        const authors = pub.authors ? pub.authors.toLowerCase() : "";
        return topic.patterns.some(
          (pattern) =>
            title.includes(pattern.toLowerCase()) ||
            journal.includes(pattern.toLowerCase()) ||
            authors.includes(pattern.toLowerCase())
        );
      })
    : labData.publications;

  const years = [...new Set(filteredPublications.map(p => p.year))].sort((a, b) => b - a);
  const selectedPubs = filteredPublications.filter(p => p.isSelected);

  return (
    <div className="section-padding">
      <Helmet>
        <title>Publications | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Publications" 
        subtitle={
          <a
            href={labData.professor.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono font-semibold text-[#5046e5] hover:text-[#3b32c4] transition-colors break-all underline underline-offset-4"
          >
            {labData.professor.googleScholar} ↗
          </a>
        }
      />

      {/* Selected Active Filter Bar */}
      <AnimatePresence>
        {selectedKeyword && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10 p-5 bg-[#e40428]/5 border border-[#e40428]/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white shadow-xs">
                <Filter size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 uppercase">ACTIVE FILTER:</span>
                  <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-md">
                    {TOPIC_TEMPLATES.find((t) => t.id === selectedKeyword)?.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  해당 연구실 핵심 키워드 성과물 중 <span className="text-primary font-bold">{filteredPublications.length}편</span>의 매칭 논문을 표시하고 있습니다.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedKeyword(null)}
              className="py-1.5 px-3 bg-white hover:bg-slate-55 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <RefreshCw size={11} className="text-stone-400" /> 필터 초기화
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Publications */}
      {selectedPubs.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center space-x-2 mb-8 animate-fade-in">
            <Star className="text-primary fill-primary animate-pulse" size={20} />
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Selected Publications</h3>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {selectedPubs.map((pub, i) => (
              <motion.div
                key={`sel-${pub.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {pub.image && (
                    <div className="md:w-72 lg:w-96 flex-shrink-0 overflow-hidden relative border-r border-slate-100 bg-white flex items-center justify-center p-3">
                      <img 
                        src={pub.image} 
                        alt={pub.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex-grow p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {pub.journal}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">{pub.year}</span>
                        <span className="px-2 py-0.5 bg-[#e40428]/5 border border-[#e40428]/25 text-primary text-[10px] font-black font-mono rounded-md">
                          IF {getPublicationImpactFactor(pub).toFixed(1)}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                        {pub.title}
                      </h4>
                      <p className="text-slate-500 font-medium italic text-sm mb-4">{pub.authors}</p>
                      
                      {pub.extraImage && (
                        <div className="mt-4 mb-6 relative rounded-2xl overflow-hidden max-w-lg bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300">
                          <img 
                            src={pub.extraImage} 
                            alt={`${pub.title} honors`} 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                    {pub.link && (
                      <div className="flex justify-end">
                        <a 
                          href={pub.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-primary transition-colors group/link"
                        >
                          VIEW PUBLICATION 
                          <ExternalLink size={14} className="ml-2 transition-transform group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Full List by Year */}
      <div className="space-y-16">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-slate-100 hidden lg:block"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-32 flex-shrink-0">
                <div className="text-4xl font-black text-slate-200 lg:sticky lg:top-24">{year}</div>
              </div>
              <div className="flex-grow space-y-8">
                {filteredPublications
                  .filter(p => p.year === year)
                  .map((pub) => (
                    <motion.div
                      key={pub.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary/20 pb-1 mb-2">
                        {pub.title}
                      </h4>
                      <p className="text-slate-500 text-sm mb-1">{pub.authors}</p>
                      <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 flex-wrap gap-y-1">
                        <span className="text-slate-900">{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 bg-[#e40428]/5 border border-[#e40428]/15 text-primary text-[9px] font-extrabold font-mono rounded-md">
                          IF {getPublicationImpactFactor(pub).toFixed(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        ))}
        
        {years.length === 0 && (
          <div className="text-center py-24 text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <p className="font-medium">해당 키워드와 매칭되는 학술 연구실적이 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">상단의 필터를 초기화해 전체 리스트를 확인해 보세요.</p>
          </div>
        )}
      </div>

      {/* Big Data Analytics: Packed Bubble Clouds component at the very bottom */}
      <KeywordBubbleCloud
        publications={labData.publications}
        selectedKeyword={selectedKeyword}
        onKeywordSelect={setSelectedKeyword}
      />
    </div>
  );
}
