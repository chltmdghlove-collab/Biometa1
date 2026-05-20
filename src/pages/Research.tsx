import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Helmet } from "react-helmet-async";

export default function Research() {
  return (
    <div className="section-padding">
      <Helmet>
        <title>Research | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Research Fields" 
        subtitle="생체메타물질 연구실은 생체 구조 속 빛의 거동을 이해하고 제어하여 생체재료, 나노포토닉스, 계산과학, 의공학과 융합해 차세대 정밀의료 기술을 개발합니다."
      />

      <div className="space-y-32 mt-20">
        {labData.researchFields.map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
          >
            <div className="w-full lg:w-1/2">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
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
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    controls
                  />
                ) : (
                  <img 
                    src={field.image} 
                    className="w-full h-full object-cover" 
                    alt={field.title} 
                  />
                )}
                <div className="absolute top-6 left-6 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  Topic {i + 1}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold text-slate-900 leading-tight">
                {field.title}
              </h3>
              <p className="text-xl text-slate-500 leading-relaxed font-light">
                {field.description}
              </p>
              <div className="pt-4">
                <div className="h-1 w-20 bg-primary/20"></div>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {field.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
