import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Helmet } from "react-helmet-async";

// Import real uploaded logo images
import afrlLogo from "../assets/images/AFRL.png";
import nrfLogo from "../assets/images/연구재단.gif";
import rdaLogo from "../assets/images/농촌진흥청.png";
import gangwonLogo from "../assets/images/강원특별자치도.gif";
import lgCnsLogo from "../assets/images/LG CNS.png";
import mezooLogo from "../assets/images/메쥬.png";
import koreaNovaLogo from "../assets/images/코리아 노바.png";
import todocLogo from "../assets/images/토닥.png";
import medianaLogo from "../assets/images/메디아나.png";

const getLogoSrc = (id: string) => {
  switch (id) {
    case "afrl":
      return afrlLogo;
    case "nrf":
      return nrfLogo;
    case "rda":
      return rdaLogo;
    case "gangwon":
      return gangwonLogo;
    case "lgcns":
      return lgCnsLogo;
    case "mezoo":
      return mezooLogo;
    case "koreanova":
      return koreaNovaLogo;
    case "todoc":
      return todocLogo;
    case "mediana":
      return medianaLogo;
    default:
      return null;
  }
};

export default function Collaborator() {
  return (
    <div className="section-padding">
      <Helmet>
        <title>Collaborators | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="국내외 협력 연구기관 및 기업" 
        subtitle="우리는 국내외 연구 기관 및 기업들과 협력하여 기술을 실생활에 적용합니다."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-w-7xl mx-auto">
        {labData.collaborators.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between p-10 bg-white border border-slate-100 rounded-3xl hover:border-indigo-600/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 group min-h-[220px]"
          >
            <div className="w-full flex-grow flex items-center justify-center p-4 transition-all duration-500 transform group-hover:scale-[1.03]">
              {getLogoSrc(partner.id) ? (
                <img
                  src={getLogoSrc(partner.id)!}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain transition-all duration-300 filter group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-sm font-black text-slate-800 leading-tight">
                  {partner.name}
                </span>
              )}
            </div>
            <div className="w-full text-center mt-6 pt-6 border-t border-slate-50">
              <h4 className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-widest leading-none">
                {partner.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
