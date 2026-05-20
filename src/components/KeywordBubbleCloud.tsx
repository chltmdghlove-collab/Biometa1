import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Publication } from "../data/mockData";
import { BookOpen, Check, Hash, RefreshCw, Sparkles } from "lucide-react";

// Definitions of key research keywords to extract from titles and journals
export interface TopicTemplate {
  id: string;
  label: string;
  korLabel: string;
  patterns: string[];
  color: string;
  bgGradient: string;
  glowColor: string;
}

export const TOPIC_TEMPLATES: TopicTemplate[] = [
  { 
    id: "chitosan", 
    label: "Chitosan & Biopolymers", 
    korLabel: "키토산 및 바이오고분자",
    patterns: ["chitosan", "biopolymer", "bio-polymer", "cellulose", "chitin"], 
    color: "text-emerald-800 border-emerald-200 bg-emerald-50/90",
    bgGradient: "url(#grad-chitosan)",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  { 
    id: "sensors", 
    label: "Flexible Sensors", 
    korLabel: "유연 센서 소자",
    patterns: ["sensor", "sensors", "detection", "strain sensor", "humidity sensor"], 
    color: "text-blue-800 border-blue-200 bg-blue-50/90",
    bgGradient: "url(#grad-sensors)",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  { 
    id: "localization", 
    label: "Anderson Localization and Random Laser", 
    korLabel: "앤더슨 국소화 및 무작위 레이저 연구",
    patterns: ["anderson", "localization", "localized", "random lasing", "random laser", "lasers", "lasing", "light amplification"], 
    color: "text-indigo-800 border-indigo-200 bg-indigo-50/90",
    bgGradient: "url(#grad-localization)",
    glowColor: "rgba(124, 58, 237, 0.45)"
  },
  { 
    id: "plasmonics", 
    label: "Plasmonic & SPR", 
    korLabel: "플라스모닉 및 표면 플라스몬 공명",
    patterns: ["plasmon", "plasmonic", "surface plasmon", "spr"], 
    color: "text-amber-800 border-amber-200 bg-amber-50/90",
    bgGradient: "url(#grad-plasmonics)",
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  { 
    id: "metamaterials", 
    label: "Metamaterials", 
    korLabel: "인공 메타물질",
    patterns: ["metamaterial", "metamaterials", "meta-material"], 
    color: "text-fuchsia-800 border-fuchsia-200 bg-fuchsia-50/90",
    bgGradient: "url(#grad-metamaterials)",
    glowColor: "rgba(217, 70, 239, 0.4)"
  },
  { 
    id: "sers", 
    label: "SERS & Spectrometry", 
    korLabel: "SERS 분광학",
    patterns: ["sers", "raman", "scattering", "spectrophotometer", "photometric"], 
    color: "text-cyan-800 border-cyan-200 bg-cyan-50/90",
    bgGradient: "url(#grad-sers)",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  { 
    id: "bci", 
    label: "BCI & EEG (Speller)", 
    korLabel: "뇌-컴퓨터 인터페이스 (BCI)",
    patterns: ["bci", "eeg", "speller", "mental", "emg"], 
    color: "text-lime-800 border-lime-200 bg-lime-50/90",
    bgGradient: "url(#grad-bci)",
    glowColor: "rgba(132, 204, 22, 0.4)"
  },
  { 
    id: "medical", 
    label: "Medical Diagnostics", 
    korLabel: "의료 및 혈액 진단 기기",
    patterns: ["stethoscope", "heart sound", "thorax", "respiratory", "neural", "nerve", "anemia", "blood", "veterinary", "medical"], 
    color: "text-red-800 border-red-200 bg-red-50/90",
    bgGradient: "url(#grad-medical)",
    glowColor: "rgba(239, 68, 68, 0.4)"
  },
  { 
    id: "nanstructures", 
    label: "Nanostructures", 
    korLabel: "나노 구조체 연구",
    patterns: ["nanostructure", "nanstructures", "nanostructures", "nanorod", "nanoparticle", "nanoparticles", "nanomedicine", "subwavelength"], 
    color: "text-violet-855 border-violet-200 bg-violet-50/90",
    bgGradient: "url(#grad-nanostructures)",
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  { 
    id: "biomass", 
    label: "Biological and Natural Materials", 
    korLabel: "천연 생물자원 소재",
    patterns: ["biomass", "insect", "larvae", "tenebrio", "silk", "nacre", "bone"], 
    color: "text-orange-900 border-orange-200 bg-orange-55/90",
    bgGradient: "url(#grad-biomass)",
    glowColor: "rgba(249, 115, 22, 0.4)"
  }
];

export function getBubbleLabelLines(label: string): string[] {
  if (label === "Biological and Natural Materials") {
    return ["Biological and", "Natural Materials"];
  }
  if (label === "Anderson Localization and Random Laser") {
    return ["Anderson Localization", "and Random Laser"];
  }
  if (label.includes(" & ")) {
    const parts = label.split(" & ");
    return [parts[0], parts[1] ? `& ${parts[1]}` : ""];
  }
  return [label, ""];
}

export function getPublicationImpactFactor(pub: any): number {
  if (typeof pub.impactFactor === "number") {
    return pub.impactFactor;
  }
  const journal = pub.journal ? pub.journal.toLowerCase() : "";
  
  if (journal.includes("nature communications")) return 14.7;
  if (journal.includes("advanced science") || journal.includes("adv. sci.")) return 15.1;
  if (journal.includes("materials horizons")) return 12.2;
  if (journal.includes("nano letters") || journal.includes("nano lett.")) return 9.6;
  if (journal.includes("nano research")) return 9.5;
  if (journal.includes("acs photonics")) return 5.9;
  if (journal.includes("scientific reports")) return 3.8;
  if (journal.includes("optics & laser technology")) return 4.6;
  if (journal.includes("applied physics letters")) return 3.5;
  if (journal.includes("biosensors")) return 5.4;
  if (journal.includes("sensors")) return 3.0; // MDPI Sensors 2024 JCR
  if (journal.includes("optics express")) return 3.2; // 2024 JCR
  if (journal.includes("biomedical optics express")) return 2.9; // 2024 JCR
  if (journal.includes("acs omega")) return 3.7;
  if (journal.includes("materials")) return 3.1;
  if (journal.includes("micromachines")) return 3.0;
  if (journal.includes("biomedical engineering letters")) return 3.2;
  if (journal.includes("photonics")) return 2.1;
  if (journal.includes("current applied physics")) return 2.4;
  if (journal.includes("applied optics")) return 1.9;
  if (journal.includes("optics letters")) return 3.1;
  if (journal.includes("photobiomodulation")) return 1.8;
  if (journal.includes("ieee")) return 3.5;
  if (journal.includes("applied physics b")) return 2.1;
  if (journal.includes("lasers in medical science")) return 2.1;
  if (journal.includes("optics communications")) return 2.2;
  
  return 3.0; // Standard fallback
}

interface KeywordBubbleCloudProps {
  publications: Publication[];
  selectedKeyword: string | null;
  onKeywordSelect: (keywordId: string | null) => void;
}

interface SimulatedNode {
  id: string;
  label: string;
  korLabel: string;
  count: number;
  impactFactorSum: number;
  impactFactorAvg: number;
  pubIds: string[];
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bgGradient: string;
  glowColor: string;
  colorClass: string;
}

export default function KeywordBubbleCloud({
  publications,
  selectedKeyword,
  onKeywordSelect
}: KeywordBubbleCloudProps) {
  const [hoveredNode, setHoveredNode] = useState<SimulatedNode | null>(null);

  // Parse and calculate counts & Impact Factor Sum & Average dynamically from the publications list
  const nodes = useMemo(() => {
    const rawNodes = TOPIC_TEMPLATES.map((template) => {
      const matchedPubs = publications.filter((pub) => {
        const title = pub.title.toLowerCase();
        const journal = pub.journal ? pub.journal.toLowerCase() : "";
        const authors = pub.authors ? pub.authors.toLowerCase() : "";
        
        return template.patterns.some(
          (pattern) =>
            title.includes(pattern.toLowerCase()) ||
            journal.includes(pattern.toLowerCase()) ||
            authors.includes(pattern.toLowerCase())
        );
      });

      const count = matchedPubs.length;
      const impactFactorSum = matchedPubs.reduce(
        (sum, pub) => sum + getPublicationImpactFactor(pub),
        0
      );
      const impactFactorAvg = count > 0 ? impactFactorSum / count : 0;

      return {
        id: template.id,
        label: template.label,
        korLabel: template.korLabel,
        count,
        impactFactorSum: parseFloat(impactFactorSum.toFixed(1)),
        impactFactorAvg: parseFloat(impactFactorAvg.toFixed(2)),
        pubIds: matchedPubs.map((p) => p.id),
        r: 0, // calculated below
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        bgGradient: template.bgGradient,
        glowColor: template.glowColor,
        colorClass: template.color
      };
    }).filter(n => n.count > 0); // only show keywords with at least 1 publication

    if (rawNodes.length === 0) return [];

    const IFAvgs = rawNodes.map((n) => n.impactFactorAvg);
    const minIFAvg = Math.min(...IFAvgs);
    const maxIFAvg = Math.max(...IFAvgs);

    // Compute node radius proportional to publication average Impact Factor (IF)
    const mappedNodes = rawNodes.map((node) => {
      // Map average IFs into circle radii between 42px and 88px
      const minRadius = 42;
      const maxRadius = 88;
      const radiusRange = maxRadius - minRadius;
      const ifAvgRange = maxIFAvg - minIFAvg || 1;
      const r = minRadius + ((node.impactFactorAvg - minIFAvg) / ifAvgRange) * radiusRange;

      return {
        ...node,
        r
      };
    });

    // Sort mappedNodes by radius descending (largest first)
    mappedNodes.sort((a, b) => b.r - a.r);

    // Run stable deterministic pre-warmed force-directed layout simulation
    const width = 800;
    const height = 450;
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize layout positions in a gentle spiral around center based on sorted size
    // Largest bubbles will be closer to the center, smaller bubbles will start further out
    mappedNodes.forEach((node, idx) => {
      const angle = idx * 0.95 + Math.PI;
      const dist = 35 + idx * 10;
      node.x = centerX + Math.cos(angle) * dist;
      node.y = centerY + Math.sin(angle) * dist;
      node.vx = 0;
      node.vy = 0;
    });

    const maxR = Math.max(...mappedNodes.map((n) => n.r));
    const minR = Math.min(...mappedNodes.map((n) => n.r));
    const rRange = maxR - minR || 1;

    // 500 physics layout solver iterations (runs in <2ms)
    for (let step = 0; step < 500; step++) {
      // Apply size-based gravity/centering force
      // Larger nodes are drawn more strongly to the absolute center.
      // Smaller nodes have a weaker centering force allowing them to float on the periphery or gaps are filled
      for (const node of mappedNodes) {
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          // Stronger centering force for larger bubbles
          const sizeFrac = (node.r - minR) / rRange; // 0.0 to 1.0
          const gravity = 0.05 + sizeFrac * 0.15; // range: 0.05 to 0.20
          node.vx += (dx / dist) * gravity;
          node.vy += (dy / dist) * gravity;
        }
      }

      // Apply collision-avoidance forces with mass-based displacement weight
      // Larger bubbles have higher mass and resist being pushed;
      // smaller bubbles have lower mass and are pushed away easily.
      for (let i = 0; i < mappedNodes.length; i++) {
        const nodeA = mappedNodes[i];
        for (let j = i + 1; j < mappedNodes.length; j++) {
          const nodeB = mappedNodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const safetyGap = 10; // safety padding
          const minDist = nodeA.r + nodeB.r + safetyGap;
          
          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            
            // Mass-weighted collision displacement based on volume approximation (radius squared)
            const massA = nodeA.r * nodeA.r;
            const massB = nodeB.r * nodeB.r;
            const totalMass = massA + massB;
            
            const shareA = massB / totalMass; // Node A reacts to B's relative mass
            const shareB = massA / totalMass; // Node B reacts to A's relative mass
            
            nodeA.vx -= nx * overlap * shareA * 0.65;
            nodeA.vy -= ny * overlap * shareA * 0.65;
            nodeB.vx += nx * overlap * shareB * 0.65;
            nodeB.vy += ny * overlap * shareB * 0.65;
          }
        }
      }

      // Apply coordinates, boundaries and damping
      for (const node of mappedNodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.68; // damping friction
        node.vy *= 0.68;

        // Clip bounds to prevent escaping the visualization box
        node.x = Math.max(node.r + 15, Math.min(width - node.r - 15, node.x));
        node.y = Math.max(node.r + 15, Math.min(height - node.r - 15, node.y));
      }
    }

    return mappedNodes;
  }, [publications]);

  const activeNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedKeyword) || null;
  }, [nodes, selectedKeyword]);

  return (
    <div className="mt-28 border border-slate-100 bg-gradient-to-b from-white to-slate-50/40 rounded-3xl p-8 sm:p-12 shadow-xs relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-50/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

      {/* Header section with instructions */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-red-600 text-[10px] font-mono tracking-wider font-extrabold uppercase shadow-xs">
          <Sparkles size={11} className="animate-pulse" /> Research Big Data Analytics
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Packed Bubble Clouds
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          연구실의 학술 실적 데이터를 기반으로 한 키워드 발생 빈도 분석 다이어그램입니다. 각 버블은 핵심 연구 주제를 나타내며, 크기는 해당 분야 논문들의 <span className="text-red-600 font-bold">임팩트 팩터(Impact Factor, IF) 평균</span>에 비례합니다. 버블을 선택하여 실시간으로 관련 실적을 필터링해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch relative z-10">
        
        {/* Left Interactive Control Board */}
        <div className="lg:col-span-1 bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <BookOpen size={16} className="text-primary" />
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">주요 분야 (평균 IF 순)</h4>
            </div>
            
            {/* Quick List triggers */}
            <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
              {[...nodes].sort((a, b) => b.impactFactorAvg - a.impactFactorAvg).map((node) => {
                const isActive = selectedKeyword === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => onKeywordSelect(isActive ? null : node.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-xl border transition-all duration-200 group relative ${
                      isActive 
                        ? "bg-primary text-white border-primary shadow-sm font-bold scale-[1.02]" 
                        : "bg-slate-50/60 hover:bg-slate-50 text-slate-700 border-slate-200/70 hover:border-slate-300"
                    }`}
                  >
                    <div className="truncate flex items-center gap-2">
                      <Hash size={12} className={isActive ? "text-white" : "text-stone-400 group-hover:text-primary transition-colors"} />
                      <span className="truncate block font-medium max-w-[155px]" title={node.label}>
                        {node.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold font-mono ${
                        isActive ? "bg-white/20 text-white" : "bg-[#e40428]/5 text-[#e40428]"
                      }`} title={`논문 ${node.count}편, 평균 IF: ${node.impactFactorAvg.toFixed(2)} (총합: ${node.impactFactorSum.toFixed(1)})`}>
                        IF {node.impactFactorAvg.toFixed(2)}
                      </span>
                      {isActive && <Check size={12} className="text-white flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {selectedKeyword ? (
              <button
                onClick={() => onKeywordSelect(null)}
                className="w-full py-2 bg-[#e40428]/5 hover:bg-[#e40428]/10 text-primary hover:text-primary-dark font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-[#e40428]/20"
              >
                <RefreshCw size={11} /> 필터 초기화
              </button>
            ) : (
              <p className="text-[10px] text-slate-400 font-mono italic text-center w-full">
                ※ 버블을 선택하면 해당 주제로 필터링됩니다.
              </p>
            )}
          </div>
        </div>

        {/* Packed Bubble Cloud Canvas SVG */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs relative flex items-center justify-center min-h-[380px]">
          
          <svg
            viewBox="0 0 800 450"
            className="w-full h-auto max-h-[450px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant SVG defs for Gradients & Glow Filters */}
            <defs>
              <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.1" />
              </filter>

              {/* Unique linear gradients for the bubble clouds */}
              <linearGradient id="grad-chitosan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="grad-sensors" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="grad-localization" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="grad-plasmonics" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="grad-metamaterials" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#a21caf" />
              </linearGradient>
              <linearGradient id="grad-sers" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
              <linearGradient id="grad-bci" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#4d7c0f" />
              </linearGradient>
              <linearGradient id="grad-medical" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="grad-nanostructures" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="grad-biomass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Bubble cloud circle systems */}
            <g>
              {nodes.map((node) => {
                const isActive = selectedKeyword === node.id;
                const isDimmed = selectedKeyword !== null && !isActive;
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <g
                    key={node.id}
                    onClick={() => onKeywordSelect(isActive ? null : node.id)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer select-none"
                  >
                    {/* Ripple/pulse effect for active node */}
                    {isActive && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 8}
                        fill="none"
                        stroke={node.glowColor}
                        strokeWidth="2.5"
                        initial={{ scale: 0.95, opacity: 0.4 }}
                        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}

                    {/* Smooth glowing shadow element behind circles on focus-hover */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={isActive || isHovered ? node.glowColor : "transparent"}
                      filter={(isActive || isHovered) ? "url(#glow-heavy)" : "url(#shadow-soft)"}
                      opacity={isDimmed ? 0.05 : isHovered ? 0.35 : isActive ? 0.5 : 0.1}
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />

                    {/* Main decorative colored bubble */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={node.bgGradient}
                      stroke={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)"}
                      strokeWidth={isActive ? 3.5 : isHovered ? 2.5 : 1.5}
                      opacity={isDimmed ? 0.22 : 0.92}
                      style={{ transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />

                    {/* Glossy highlight reflect overlay */}
                    <ellipse
                      cx={node.x}
                      cy={node.y - node.r * 0.45}
                      rx={node.r * 0.55}
                      ry={node.r * 0.22}
                      fill="rgba(255, 255, 255, 0.25)"
                      pointerEvents="none"
                      opacity={isDimmed ? 0.1 : 0.8}
                    />

                    {/* Text groups (Title & Impact Factor indicator inside each bubble) */}
                    <g opacity={isDimmed ? 0.25 : 1} className="pointer-events-none text-shadow-md">
                      {/* Technical terms split word wrapped */}
                      {node.r > 52 ? (
                        <>
                          <text
                            x={node.x}
                            y={node.y - (node.r > 75 ? 11 : node.r > 64 ? 9 : 7)}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={node.r > 75 ? "15.5px" : node.r > 64 ? "13.5px" : "11.5px"}
                            fontWeight="900"
                            letterSpacing="0.01em"
                            className="font-sans drop-shadow-md"
                          >
                            {getBubbleLabelLines(node.label)[0]}
                          </text>
                          <text
                            x={node.x}
                            y={node.y + (node.r > 75 ? 5 : node.r > 64 ? 4 : 3)}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={node.r > 75 ? "15.5px" : node.r > 64 ? "13.5px" : "11.5px"}
                            fontWeight="900"
                            letterSpacing="0.01em"
                            className="font-sans drop-shadow-md"
                          >
                            {getBubbleLabelLines(node.label)[1]}
                          </text>
                        </>
                      ) : (
                        <text
                          x={node.x}
                          y={node.y - 2}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={node.r > 48 ? "12px" : "10px"}
                          fontWeight="900"
                          letterSpacing="0.01em"
                          className="font-sans drop-shadow-md"
                        >
                          {node.label === "Biological and Natural Materials" 
                            ? "Bio & Nat." 
                            : node.label.replace(" & ", " & ").slice(0, 11) + (node.label.length > 11 ? "." : "")}
                        </text>
                      )}

                      {/* Display papers Impact Factor average indicator */}
                      <text
                        x={node.x}
                        y={node.y + (node.r > 75 ? 24 : node.r > 64 ? 18 : 14)}
                        textAnchor="middle"
                        fill="rgba(255, 255, 255, 0.95)"
                        fontSize={node.r > 64 ? "11.5px" : "9.5px"}
                        fontWeight="900"
                        className="font-mono tracking-wide"
                      >
                        Avg.IF {node.impactFactorAvg.toFixed(1)}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Floating Detail Overlay / Contextual Glass Card */}
          <AnimatePresence>
            {(hoveredNode || activeNode) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-5 left-5 right-5 p-4 rounded-xl border border-slate-200/50 bg-white/90 backdrop-blur-md shadow-lg z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-cover`} style={{ background: (hoveredNode || activeNode)?.glowColor }} />
                    <h5 className="text-[13px] font-black text-slate-900">
                      {(hoveredNode || activeNode)?.label}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-400">
                      | {(hoveredNode || activeNode)?.korLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium flex items-center flex-wrap gap-x-2 gap-y-1">
                    <span>매칭 논문 수: <span className="font-bold text-slate-800">{(hoveredNode || activeNode)?.count}편</span></span>
                    <span className="text-slate-305">•</span>
                    <span>평균 임팩트 팩터: <span className="font-extrabold text-[#e40428] bg-[#e40428]/5 px-1.5 py-0.5 rounded-md">IF {(hoveredNode || activeNode)?.impactFactorAvg.toFixed(2)}</span></span>
                    <span className="text-slate-305">•</span>
                    <span className="text-slate-450 text-[10px]">(총합: IF {(hoveredNode || activeNode)?.impactFactorSum.toFixed(1)})</span>
                  </p>
                </div>
                
                <span className="text-[9px] font-mono font-bold tracking-tight px-2 py-1 bg-slate-150 text-slate-500 rounded-lg border border-slate-300/40">
                  {selectedKeyword && (hoveredNode || activeNode)?.id === selectedKeyword 
                    ? "✓ 클릭하여 필터링 해제" 
                    : "⚡︎ 버블 클릭 시 본 문헌 목록 필터링"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
