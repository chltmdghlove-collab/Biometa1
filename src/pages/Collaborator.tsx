import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Helmet } from "react-helmet-async";

export default function Collaborator() {
  return (
    <div className="section-padding">
      <Helmet>
        <title>Collaborators | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Global Partners" 
        subtitle="우리는 세계적인 연구 기관 및 혁신 기업들과 협력하여 기술의 가치를 극대화합니다."
        centered
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
        {labData.collaborators.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-12 bg-white border border-slate-100 rounded-3xl hover:border-primary/20 hover:shadow-lg transition-all group"
          >
            <div className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
              {partner.logo}
            </div>
            <h4 className="text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest text-center">
              {partner.name}
            </h4>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-12 bg-primary/5 rounded-3xl text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 font-primary">Open Collaboration</h3>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Biometamaterials 연구실은 새로운 공동 연구 및 산학 협력을 언제나 환영합니다. 
          우리의 플랫폼 기술을 활용한 새로운 프로젝트 제안이 있으시다면 언제든 연락 부탁드립니다.
        </p>
      </div>
    </div>
  );
}
