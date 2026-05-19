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
        subtitle="우리의 연구 성과는 세계 유수의 학술지에 게재되어 그 가치를 인정받고 있습니다."
      />

      {/* Selected Publications */}
      {selectedPubs.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="text-primary fill-primary" size={20} />
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Selected Publications</h3>
          </div>
          <div className="space-y-6">
            {selectedPubs.map((pub, i) => (
              <motion.div
                key={`sel-${pub.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-grow">
                    <div className="text-primary font-bold text-sm mb-2">{pub.journal} ({pub.year})</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{pub.title}</h4>
                    <p className="text-slate-500 font-medium italic">{pub.authors}</p>
                  </div>
                  {pub.link && (
                    <div className="flex-shrink-0">
                      <a href={pub.link} className="flex items-center text-sm font-bold text-primary hover:underline">
                        VIEW DOI <ExternalLink size={14} className="ml-1.5" />
                      </a>
                    </div>
                  )}
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
