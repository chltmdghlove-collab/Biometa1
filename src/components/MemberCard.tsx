import { Member } from "../data/mockData";
import { Mail, GraduationCap, ArrowUpRight, Globe2 } from "lucide-react";

interface MemberCardProps {
  member: Member;
  onClick?: () => void;
}

const roleColors: Record<string, { badge: string; text: string; glow: string; bg: string }> = {
  ResearchProfessor: {
    badge: "bg-rose-50 border-rose-200/50",
    text: "text-rose-700",
    glow: "group-hover:shadow-[0_20px_40px_rgba(244,63,94,0.06)] group-hover:border-rose-200",
    bg: "from-rose-50/40 via-white to-slate-50/20"
  },
  PhD: {
    badge: "bg-emerald-50 border-emerald-200/50",
    text: "text-emerald-700",
    glow: "group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] group-hover:border-emerald-200",
    bg: "from-emerald-50/40 via-white to-slate-50/20"
  },
  Master: {
    badge: "bg-amber-50 border-amber-200/50",
    text: "text-amber-700",
    glow: "group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)] group-hover:border-amber-200",
    bg: "from-amber-50/30 via-white to-slate-50/20"
  },
  Undergraduate: {
    badge: "bg-indigo-50 border-indigo-200/50",
    text: "text-indigo-700",
    glow: "group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.06)] group-hover:border-indigo-200",
    bg: "from-indigo-50/35 via-white to-slate-50/20"
  },
  Alumni: {
    badge: "bg-slate-100 border-slate-200/60",
    text: "text-slate-700",
    glow: "group-hover:shadow-[0_20px_40px_rgba(71,85,105,0.06)] group-hover:border-slate-300",
    bg: "from-slate-100/40 via-white to-slate-50/20"
  }
};

const roleLabels: Record<string, string> = {
  ResearchProfessor: "Research Professor",
  PhD: "Ph.D. Course",
  Master: "M.S. Course",
  Undergraduate: "Undergrad Researcher",
  Alumni: "Alumni"
};

// Compute initials for clean placeholder representation
const getInitials = (name: string) => {
  const cleanName = name.replace(/[,/].*$/, "").trim(); // strip titles like , PhD or /PhD
  const parts = cleanName.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

export default function MemberCard({ member, onClick }: MemberCardProps) {
  // Determine if image is an upload/valid remote path or a standard placeholder string
  const hasUploadedOrValidImage = 
    member.image && (
      member.image.startsWith("data:image/") || 
      member.image.startsWith("http://") || 
      member.image.startsWith("https://") ||
      member.image.includes("/")
    ) && !member.image.endsWith(".jpg"); // Only valid full paths

  const theme = roleColors[member.role] || roleColors.Alumni;

  return (
    <div 
      onClick={onClick}
      className={`group bg-white border border-slate-100/70 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative cursor-pointer ${theme.glow}`}
    >
      {/* Decorative hover overlay card action */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
        <span className="p-1.5 bg-slate-900/85 backdrop-blur-md text-white rounded-lg inline-flex items-center justify-center shadow-md">
          <ArrowUpRight size={13} />
        </span>
      </div>

      {/* Photo / Decorative Avatar Area */}
      <div 
        className={`aspect-[4/5] overflow-hidden relative select-none flex items-center justify-center border-b border-rose-100/10 ${
          !hasUploadedOrValidImage 
            ? `bg-gradient-to-br ${theme.bg} p-6 text-center` 
            : "bg-slate-50"
        }`}
      >
        {hasUploadedOrValidImage ? (
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center relative w-full h-full">
            {/* Soft background grid lines mock-up */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
            
            {/* Elegant initials layout with minimalist circle element */}
            <div className="w-18 h-18 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                {getInitials(member.name)}
              </span>
            </div>
            
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-4 bg-slate-100/80 border border-slate-200/30 px-3.5 py-1 rounded-full">
              {member.name.split(",")[0]}
            </div>
          </div>
        )}

        {/* Fellowship / Funding badge */}
        {member.fellowship && (
          <div className="absolute bottom-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-[8px] py-1 px-2.5 font-bold rounded-lg tracking-wide uppercase shadow-sm">
            {member.fellowship}
          </div>
        )}
      </div>

      {/* Member Details Content Profile Card */}
      <div className="p-6 flex-grow flex flex-col bg-white">
        <div className="flex flex-col flex-grow">
          {/* Role badge */}
          <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
            <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.badge} ${theme.text}`}>
              {roleLabels[member.role] || member.role}
            </span>
            {member.country && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Globe2 size={10} className="text-slate-300" />
                  {member.country}
                </span>
              </>
            )}
          </div>
          
          {/* Member Name */}
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors duration-200">
            {member.name}
          </h3>
          
          {member.englishName && (
            <div className="text-[11px] text-slate-400 font-medium tracking-wide mt-0.5">{member.englishName}</div>
          )}
          
          {/* Short description / Status */}
          {member.description && member.description !== member.role && (
            <p className="text-xs text-slate-500 font-normal mt-2 leading-relaxed line-clamp-2">
              {member.description}
            </p>
          )}

          {/* Education background - Formatted inline with elegant dots */}
          {member.education && member.education.length > 0 && (
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-start gap-2">
              <GraduationCap size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-slate-600 leading-normal line-clamp-2 font-light" title={member.education.join(", ")}>
                {member.education[0]}
                {member.education.length > 1 && ` • ${member.education[1]}`}
              </p>
            </div>
          )}

          {/* Email link */}
          {member.email && (
            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center text-[10.5px] text-slate-400 group-hover:text-primary font-medium transition-colors truncate">
              <Mail size={12} className="mr-1.5 text-slate-400 group-hover:text-primary flex-shrink-0" />
              <span className="truncate">{member.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
