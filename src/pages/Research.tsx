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
        subtitle="우리는 바이오 메타물질을 통해 미래 의료의 새로운 패러다임을 제시하며, 혁신적인 기초 연구와 응용 연구를 병행합니다."
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
                <img 
                  src={field.image} 
                  className="w-full h-full object-cover" 
                  alt={field.title} 
                />
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
              <p className="text-slate-600 leading-bold">
                본 분야에서는 자연계의 기계적 메커니즘을 심도 있게 분석하고, 이를 인공적인 나노/마이크로 구조체에 이식하여 극도의 물성 제어를 달성하는 것을 목표로 합니다. 특히 생체 적합성 고분자와 하이드로젤을 메타물질 구조와 결합하여, 인체 내부의 복잡한 물리적 신호를 모방하거나 제어하는 원천 기술을 확보하고 있습니다.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
