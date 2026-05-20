import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { ExternalLink, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Publication() {
  const years = [...new Set(labData.publications.map(p => p.year))].sort((a, b) => b - a);
  const selectedPubs = labData.publications.filter(p => p.isSelected);

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

      {/* Selected Publications */}
      {selectedPubs.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="text-primary fill-primary" size={20} />
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Selected Publications</h3>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {selectedPubs.map((pub, i) => (
              <motion.div
                key={`sel-${pub.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {pub.image && (
                    <div className="md:w-72 lg:w-96 flex-shrink-0 overflow-hidden relative border-r border-slate-100">
                      <img 
                        src={pub.image} 
                        alt={pub.title}
                        className="w-full h-48 md:h-full object-contain bg-slate-50 transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  )}
                  <div className="flex-grow p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {pub.journal}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">{pub.year}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                        {pub.title}
                      </h4>
                      <p className="text-slate-500 font-medium italic text-sm mb-6">{pub.authors}</p>
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
                {labData.publications
                  .filter(p => p.year === year)
                  .map((pub, i) => (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary/20 pb-1 mb-2">
                        {pub.title}
                      </h4>
                      <p className="text-slate-500 text-sm mb-1">{pub.authors}</p>
                      <div className="flex items-center space-x-3 text-xs font-bold text-slate-400">
                        <span className="text-slate-900">{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
