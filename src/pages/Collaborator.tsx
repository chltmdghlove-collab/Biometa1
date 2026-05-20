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

      {/* Decorative Elegant Divider */}
      <div className="max-w-7xl mx-auto my-24 border-t border-slate-100" />

      {/* Government Projects Section */}
      <div className="max-w-7xl mx-auto pb-12">
        <SectionHeader 
          title="국내외 정부 과제 수주 및 수행현황" 
          subtitle="Biometamaterials Lab에서 수주 및 수행 중인 주요 정부 지원 국가 연구 개발 과제 및 글로벌 국책 공동 연구 현황입니다."
          centered
        />

        {/* Dynamic Project Grid/Rows */}
        <div className="divide-y divide-slate-100 max-w-5xl mx-auto mt-12">
          {[
            {
              status: "active",
              agency: "과학기술정보통신부 / 한국연구재단 (NRF)",
              title: "생체 메타물질 기반 차세대 나노광학 정밀진단 바이오센서 원천 플랫폼 개발",
              period: "2026.03 - 2031.02",
              role: "주관연구책임기관 (Principal Investigator)",
              desc: "생체 적합 유기 메타물질 내 Anderson 광학 국소화 현상을 유도하여 극미량의 바이오 마커를 고감도로 정량 측정하는 새로운 패러다임의 원천 기술을 연구 개발합니다."
            },
            {
              status: "active",
              agency: "보건복지부 / 한국보건산업진흥원 (KHIDI)",
              title: "다기능성 바이오 메타소재를 활용한 인공 골 임플란트 표면골융합 신소재 지원 연구",
              period: "2025.04 - 2028.03",
              role: "공동연구개발기관 (Co-Investigator)",
              desc: "정량화된 저출력 자극 메타 그리드를 형성하여 임플란트 접촉 표면의 유해 세균 성장을 억제하고 골성장을 가속화하는 핵심 인공 생체 구조체를 고안합니다."
            },
            {
              status: "completed",
              agency: "농촌진흥청 (RDA)",
              title: "저차원 유기 하이브리드 필름 센서 기반의 고효율 병원성 균 주파 모니터링",
              period: "2023.03 - 2026.02",
              role: "주관연구기관 (Principal Investigator)",
              desc: "가공 지대에서 병원균 오염 위험을 조기 진단하기 위한 실시간 유기 비색 감지 필름 및 소형 전용 리더기 기술을 개발 완료한 실증적 프로젝트입니다."
            }
          ].map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="py-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start group first:pt-4"
            >
              {/* Metadata Column */}
              <div className="md:w-1/4 shrink-0 space-y-3.5 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-md uppercase font-mono ${
                      proj.status === "active"
                        ? "bg-rose-50 text-[#e40428]"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full ${proj.status === "active" ? "bg-[#e40428]" : "bg-slate-400"}`} />
                    {proj.status === "active" ? "수행중" : "완료"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    {proj.period}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">Sponsoring Agency</span>
                  <span className="text-xs font-bold text-slate-700 block leading-tight">{proj.agency}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">Participation Role</span>
                  <span className="text-xs font-semibold text-[#e40428] block leading-tight">{proj.role}</span>
                </div>
              </div>

              {/* Title & Description Column */}
              <div className="flex-1 space-y-2 text-left">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#e40428] transition-colors leading-snug">
                  {proj.title}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line">
                  {proj.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
