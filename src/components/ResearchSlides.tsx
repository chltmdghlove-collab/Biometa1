import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X, RefreshCw, Layers, Cpu, Award } from "lucide-react";

// Import local exact research images provided by user
import r1Image from "../assets/images/r1.png";
import r2Image from "../assets/images/r2-2.png";
import r3Image from "../assets/images/r3-2.png";
import r4Image from "../assets/images/r4-2.png";
import r5Image from "../assets/images/r5-2.png";
import r6Image from "../assets/images/r6-2.png";
import r7Image from "../assets/images/r7-2.png";
import r8Image from "../assets/images/r8-2.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  paper: string;
  journal: string;
  year: number;
  imagePath: string;
  description: string;
  techBadge: string;
  colorTheme: string; // Tailwind colors for decorative elements
}

const RESEARCH_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Sustainable Packaging Film from Tenebrio-Derived Chitosan",
    subtitle: "갈색거절이(Tenebrio) 유래 키토산 기반 고성능 친환경 패키징 필름 개발",
    paper: "Chitosan extracted from the biomass of Tenebrio molitor larvae as a sustainable packaging film",
    journal: "Materials, vol. 17, no. 15, p. 3670",
    year: 2024,
    imagePath: r1Image,
    techBadge: "Sustainable Eco-Materials",
    colorTheme: "from-emerald-500 to-teal-600",
    description: "갈색거절이(Tenebrio molitor) 밀웜 바이오매스 원천에서 저비용 저환경부하 공정으로 추출해낸 천연 Chitosan 지지체를 기반으로, 우수한 생분해성과 향상된 산소 차단 계수를 지닌 지속가능한 능동형 과채류 가이드 코팅 패키징 필름소재(CAMC) 연구 결과입니다."
  },
  {
    id: 2,
    title: "Chitosan-Based Colorimetric pH Sensor",
    subtitle: "식품 부패 및 환경 산도 모니터링을 위한 천연 키토산 기반 변색형 pH 센서",
    paper: "The Use of Biomass-Derived Chitosan for Colorimetric pH Detection",
    journal: "Photonics, vol. 12, no. 3, p. 231",
    year: 2025,
    imagePath: r2Image,
    techBadge: "Optical Biosensors",
    colorTheme: "from-indigo-500 to-purple-600",
    description: "수산 가공 및 곤충 유래 천연 고순도 키토산 고정 매트릭스와 자외선-가시광선 파장대 흡수 고선택성을 갖춘 천연 바이오 염료(안토시아닌)를 조밀 하이브리드 성형하여, 아주 미세한 가스 방출 및 액상 pH 섭동에도 극적 색상 변화를 유도해내는 비색 감응 스마트 바이오센서 필름입니다."
  },
  {
    id: 3,
    title: "Chitosan–Glycerol–PVA Hydrogel Electrodes",
    subtitle: "생체 적합 수용성 하이드로겔 및 고전도성 인체 부착형 진단 전극 설계",
    paper: "Development of High-Performance Chitosan–Glycerol–PVA Hydrogel Electrodes for Physiological Signal Monitoring",
    journal: "ACS Applied Polymer Materials",
    year: 2025,
    imagePath: r3Image,
    techBadge: "Hydrogel Electrodes",
    colorTheme: "from-blue-500 to-indigo-600",
    description: "천연 키토산 사슬 네트워크 내에 친수성 폴리비닐알코올(PVA) 및 글리세롤 전도 매개 네트워크를 고밀도 상호침투망(IPN) 형상으로 안착시켜, 건조하거나 고도의 습윤 인자 하에서도 기계성 인장력과 전하 전달 임피던스를 탁월하게 유지하는 심전도(ECG)/근전도(EMG) 임상용 연질 인터페이스 자가부착형 극박 전극 공정입니다."
  },
  {
    id: 4,
    title: "Chitosan-Based Strain Sensor for Thoracic Respiratory Monitoring",
    subtitle: "초유연 나노 합성 기질 기반의 소형 흉부 부착식 호흡 키네마틱 감지 센서",
    paper: "Kinematic Monitoring of the Thorax During the Respiratory Cycle Using a Biopolymer-Based Strain Sensor: A Chitosan–Glycerol–Graphite Composite",
    journal: "Biosensors, vol. 15, no. 9, p. 523",
    year: 2025,
    imagePath: r4Image,
    techBadge: "Flexible Strain Sensors",
    colorTheme: "from-teal-500 to-emerald-600",
    description: "피부 신축률과 고유 탄성 진동 한계를 추종하는 키토산-글리세롤 다공성 공중합체 매질 상에 미세 결정형 흑연 전도성 필러를 고르게 결합함으로써, 호흡에 의해 물리적으로 발생하는 흉벽 전후 좌우의 극비소 변위 섭동 변화를 고선형적 저항 복제 감쇠 신호로 도출해내는 고정밀 일체형 인장 센서 시스템입니다."
  },
  {
    id: 5,
    title: "Flexible Triboelectric Nanogenerator Based on Biowaste-Derived Chitosan",
    subtitle: "해양 및 수산 폐기 유래 키토산 박막 기반 고효율 유연 마찰대전 나노발전기",
    paper: "Biowaste-Derived Chitosan for High-Performance Flexible Triboelectric Nanogenerators",
    journal: "Nano Energy",
    year: 2026,
    imagePath: r5Image,
    techBadge: "Energy Harvesting",
    colorTheme: "from-amber-500 to-orange-600",
    description: "자연사물 유기 바인더 물질인 Chitosan 지지체의 뛰어난 마찰대전 전자 축적 특성을 정밀 고안된 금속 전극 및 보호 기재와 융합함으로써, 도bo 운동 시 압력이나 굽힘, 또는 일상 손목 동작 등에서 유도되는 표면 마찰 충전량을 교류 전류 전구체로 부스팅 변환하는 친환경 자가발전 스마트 플라스틱 동력원 모듈입니다."
  },
  {
    id: 6,
    title: "Sustainable Flexible Ammonia Sensor from Tenebrio-Derived Chitosan",
    subtitle: "곤충 유래 친환경 키토산-산화그래핀 하이브리드 고선택성 정밀 암모니아 센서",
    paper: "Flexible and Robust Ammonia Gas Sensor Engineered with Graphene Oxide and Insect-Derived Chitosan Composite",
    journal: "Sensors and Actuators B: Chemical",
    year: 2026,
    imagePath: r6Image,
    techBadge: "Wearable Gas Sensors",
    colorTheme: "from-rose-500 to-pink-600",
    description: "밀웜 외골격에서 비정질 정제 처리해낸 천연 키토산 고온 기질에 친핵성 암모니아 분자와의 국부 정전기적 쿨롱 인자 인력이 활발한 산화 그래핀 나노시트(GO) 구조체를 도핑하여, 극미량 분사 가스 상온 흡착 및 탈착 반응 패턴 속도(Response/Recovery time)를 초고속 감지 스펙트럼으로 개선한 유연 가스 어레이 구조입니다."
  },
  {
    id: 7,
    title: "Sustainable Flexible Humidity Sensor from Insect-Derived Chitosan",
    subtitle: "밀웜 스킨 업사이클링 천연 키토산 이온 공중합 기반 자가반응형 초고속 무선 습도 센서",
    paper: "Development of a Sustainable Flexible Humidity Sensor Based on Tenebrio molitor Larvae Biomass-Derived Chitosan",
    journal: "Sensors, vol. 25, no. 2, p. 575",
    year: 2025,
    imagePath: r7Image,
    techBadge: "Flexible Humidity Sensors",
    colorTheme: "from-lime-500 to-green-600",
    description: "유기동물성 자원 부산물(밀웜)에서 획득한 고성능 다기능성 키토산의 수분 흡착 및 프로톤 호핑 저항 변화 기구를 응용하고 ESP32 무선 마이크로컨트롤러 시스템과 연동해 초당 십수 회 연산 주기로 습도 변화율을 실시간 계측, 스마트 빌딩 감시 및 마스크 내 실시간 가습 진단 기능을 성공적으로 시연했습니다."
  },
  {
    id: 8,
    title: "Stretchable Chitosan E-Skin for Human–Robot Interaction",
    subtitle: "레이저 가소 가공 전극 형상 결합 키토산 기반 고인장 전자 피부 및 원격 다축 로봇 제어",
    paper: "Stretchable and Biocompatible Chitosan-Based E-Skin for Interactive Human–Robot Control Interfaces",
    journal: "Advanced Intelligent Systems",
    year: 2026,
    imagePath: r8Image,
    techBadge: "Interactive E-Skin",
    colorTheme: "from-cyan-500 to-indigo-600",
    description: "곤충 유래 신장형 고유 키토산-글리세롤 바이오필름 위에 레이저 커팅을 통한 마스킹 메쉬 은 나노 세밀 전극 패턴을 안전하게 배치하여 자극 없는 일체적 관절 부착형 인장 민감성 전자피부(E-skin)를 확보하였습니다. 손가락의 굴곡 신호를 무선 주파수 신호로 리시버 가이드 로봇 관절에 가스 전송하여 4방향 주행 동역학 및 조종을 직관적으로 연동 구현했습니다."
  }
];

export default function ResearchSlides() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Set up autoplay
  useEffect(() => {
    if (!isAutoplay || isZoomed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RESEARCH_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, isZoomed]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + RESEARCH_SLIDES.length) % RESEARCH_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % RESEARCH_SLIDES.length);
  };

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const currentSlide = RESEARCH_SLIDES[currentIndex];

  return (
    <section id="research-slides" className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Column */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              Slide Presentation
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Current Research & Presentations
              <span className="block text-slate-500 text-lg font-normal mt-2">
                현재 수행중인 연구를 소개합니다.
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                isAutoplay 
                  ? "bg-slate-900 text-white border-transparent shadow-sm" 
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <RefreshCw size={14} className={isAutoplay ? "animate-spin" : ""} />
              {isAutoplay ? "Auto-Play ON" : "Paused"}
            </button>
            <div className="flex items-center space-x-1.5 p-1 bg-white border border-slate-100 rounded-xl shadow-xs">
              <button 
                onClick={handlePrev}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                id="btn-prev-slide"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono font-medium px-2 text-slate-400">
                {String(currentIndex + 1).padStart(2, '0')} / {String(RESEARCH_SLIDES.length).padStart(2, '0')}
              </span>
              <button 
                onClick={handleNext}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                id="btn-next-slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Core Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Slide Visualization */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div 
              className="relative aspect-video lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group"
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => isAutoplay && setIsAutoplay(true)}
            >
              
              {/* Expand Button */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105 select-none duration-300"
                id="btn-zoom-slide"
                title="슬라이드 크게 보기"
              >
                <Maximize2 size={18} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  {/* Fallback Beautiful Vector Slide Card if real image fails/doesn't exist */}
                  {imageErrors[currentSlide.id] ? (
                    <div className="w-full h-full text-white bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-between p-10 select-none relative overflow-hidden">
                      
                      {/* Geometric grid mesh pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 z-0"></div>
                      
                      {/* Floating abstract aura lights */}
                      <div className={`absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br ${currentSlide.colorTheme} rounded-full filter blur-[100px] opacity-15 mix-blend-screen`}></div>
                      <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-indigo-500 rounded-full filter blur-[120px] opacity-10 mix-blend-screen"></div>

                      <div className="relative z-10 flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase block">
                            Yonsei University // Biometamaterials Lab
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 block">
                            DEVICE_ID: BT-{String(currentSlide.id).padStart(3, '0')} // STATUS: ACTIVE
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border text-indigo-300 border-indigo-500/30 bg-indigo-500/10 uppercase`}>
                          {currentSlide.journal} ({currentSlide.year})
                        </span>
                      </div>

                      <div className="relative z-10 my-auto py-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-[10px] font-mono text-indigo-200">
                          <Cpu size={11} />
                          {currentSlide.techBadge}
                        </div>
                        <h4 className="text-3xl lg:text-3xl font-bold tracking-tight text-white mb-2 font-sans">
                          {currentSlide.title}
                        </h4>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-indigo-300 mb-4"></div>
                        <p className="text-sm font-light text-slate-300 leading-relaxed max-w-xl">
                          {currentSlide.subtitle}
                        </p>
                      </div>

                      <div className="relative z-10 flex justify-between items-end border-t border-slate-800/60 pt-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${currentSlide.colorTheme} text-white`}>
                            <Layers size={14} />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-slate-400 block uppercase">Cite Reference Identifier</span>
                            <span className="text-xs font-mono font-medium text-slate-300 line-clamp-1">{currentSlide.paper}</span>
                          </div>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 tracking-wider">
                          #Slide_{currentSlide.id}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={currentSlide.imagePath}
                      alt={currentSlide.title}
                      className="w-full h-full object-contain bg-white select-none cursor-pointer"
                      onClick={() => setIsZoomed(true)}
                      onError={() => handleImageError(currentSlide.id)}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Position Dots Indicator over slide bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-1.5 p-2 rounded-full bg-slate-950/40 backdrop-blur-sm">
                {RESEARCH_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    title={`${idx + 1}번 슬라이드로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Rich Informative Panel */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between">
            <div className="h-[520px] sm:h-[455px] md:h-[415px] lg:h-[495px] xl:h-[455px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6 flex-grow flex flex-col justify-start py-4"
                >
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${currentSlide.colorTheme} text-white shadow-xs`}>
                      <Award size={13} />
                      {currentSlide.techBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 font-sans tracking-tight">
                      {currentSlide.title}
                    </h3>
                    <h4 className="text-base font-semibold text-slate-600 leading-relaxed">
                      {currentSlide.subtitle}
                    </h4>
                  </div>

                  <div className="h-[1px] w-full bg-slate-200/80"></div>

                  <p className="text-sm text-slate-500 leading-relaxed font-normal overflow-y-auto max-h-[120px] sm:max-h-[110px] lg:max-h-[135px] pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick slide shortcut index switcher */}
            <div className="border-t border-slate-200/60 pt-6 mt-6">
              <div className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">Jump to Topic Slide</div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {RESEARCH_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsAutoplay(false);
                    }}
                    className={`py-2 text-[11px] font-mono font-bold rounded-lg border transition-all ${
                      idx === currentIndex
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    r{slide.id}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modern Lightbox Overlay (Modal Zoom Mode) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950/98 text-white p-6 backdrop-blur-md"
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsZoomed(false);
              if (e.key === "ArrowLeft") handlePrev();
              if (e.key === "ArrowRight") handleNext();
            }}
            tabIndex={0}
          >
            
            {/* Top Bar inside Lightbox */}
            <div className="flex justify-between items-center z-10 w-full max-w-7xl mx-auto py-2">
              <div>
                <span className="text-[10px] tracking-[0.2em] font-mono text-slate-400 uppercase">Interactive Deep-Dive Viewer</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{currentSlide.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-full text-slate-300">
                  {currentIndex + 1} / {RESEARCH_SLIDES.length}
                </span>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white rounded-full transition-all"
                  id="btn-close-zoom"
                  title="Close (ESC)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Central Media Sandbox with Prev/Next overlays */}
            <div className="relative flex-grow flex items-center justify-center max-w-7xl mx-auto w-full my-4 select-none">
              
              {/* Left Overlay Control */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 z-40 p-4 bg-white/5 hover:bg-white/10 text-white rounded-full hover:scale-110 active:scale-90 transition-all backdrop-blur-lg border border-white/5"
                title="이전 슬라이드"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Action image box */}
              <div className="w-full h-full max-h-[75vh] flex items-center justify-center relative rounded-2xl overflow-hidden bg-slate-950">
                {imageErrors[currentSlide.id] ? (
                  <div className="w-full max-w-4xl max-h-[60vh] aspect-video border border-white/10 text-white bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-between p-12 relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_30px] opacity-10"></div>
                    <div className={`absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br ${currentSlide.colorTheme} rounded-full filter blur-[120px] opacity-15`}></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-xs font-mono tracking-widest text-indigo-400 font-bold uppercase block">
                          Biometamaterials Research Slide Platform
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          INDEX_KEY: RSLIDE-{currentSlide.id} // SECURE ENVELOPE
                        </span>
                      </div>
                      <span className={`px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-slate-300 rounded-full`}>
                        {currentSlide.journal} ({currentSlide.year})
                      </span>
                    </div>

                    <div className="relative z-10 py-4 my-auto">
                      <span className={`inline-block px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-4`}>
                        {currentSlide.techBadge}
                      </span>
                      <h4 className="text-4xl font-extrabold tracking-tight text-white mb-3">
                        {currentSlide.title}
                      </h4>
                      <p className="text-lg font-light text-slate-300 leading-relaxed max-w-2xl">
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-6">
                      <p className="text-xs text-slate-400 max-w-lg italic">
                        "{currentSlide.paper}"
                      </p>
                      <span className="text-xs font-mono text-slate-500">
                        Page {currentSlide.id}
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentSlide.imagePath}
                    alt={currentSlide.title}
                    className="max-w-full max-h-full object-contain cursor-default"
                    onError={() => handleImageError(currentSlide.id)}
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Right Overlay Control */}
              <button 
                onClick={handleNext}
                className="absolute right-4 z-40 p-4 bg-white/5 hover:bg-white/10 text-white rounded-full hover:scale-110 active:scale-90 transition-all backdrop-blur-lg border border-white/5"
                title="다음 슬라이드"
              >
                <ChevronRight size={28} />
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
