import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Calendar, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function News() {
  return (
    <div className="section-padding">
      <Helmet>
        <title>News & Events | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="News & Events" 
        subtitle="연구실의 최신 소식과 국내외 유수의 기관들과 함께하는 다양한 활동들을 전해드립니다."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {labData.news.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center text-primary mb-4">
              <Calendar size={16} className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-widest">{item.date}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {item.content}
            </p>
            <button className="flex items-center text-xs font-bold text-slate-900 group-hover:text-primary uppercase tracking-wider transition-colors">
              Read More <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
