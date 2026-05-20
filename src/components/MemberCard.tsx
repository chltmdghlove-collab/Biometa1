import { Member } from "../data/mockData";
import { Mail, GraduationCap } from "lucide-react";

interface MemberCardProps {
  member: Member;
}

const roleLabels: Record<string, string> = {
  ResearchProfessor: "Research Professor",
  PhD: "Ph.D. Course",
  Master: "M.S. Course",
  Undergraduate: "Undergraduate Researcher",
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

export default function MemberCard({ member }: MemberCardProps) {
  // Determine if image is an upload/valid remote path or a standard placeholder string
  const hasUploadedOrValidImage = 
    member.image && (
      member.image.startsWith("data:image/") || 
      member.image.startsWith("http://") || 
      member.image.startsWith("https://") ||
      member.image.includes("/")
    ) && !member.image.endsWith(".jpg"); // Only valid full paths

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative">
      
      {/* Photo / Decorative Avatar Area */}
      <div 
        className={`aspect-[4/5] overflow-hidden relative select-none ${
          !hasUploadedOrValidImage ? "bg-gradient-to-br from-indigo-50/40 via-slate-50 to-emerald-50/30 flex flex-col items-center justify-center p-6 text-center border-b border-slate-50" : "border-b border-slate-50"
        }`}
      >
        {hasUploadedOrValidImage ? (
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center relative">
            {/* Elegant initials layout with minimalist circle element */}
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-slate-100/80 mb-4 shadow-[0_8px_16px_rgba(0,0,0,0.03)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-700 to-indigo-700 bg-clip-text text-transparent">
                {getInitials(member.name)}
              </span>
            </div>
            <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {member.name.split(",")[0]}
            </div>
          </div>
        )}

        {member.fellowship && (
          <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md text-white text-[8px] py-1 px-2.5 font-bold rounded-lg tracking-wide uppercase transition-colors group-hover:bg-indigo-600">
            {member.fellowship}
          </div>
        )}
      </div>

      {/* Member Details Content Profile Card */}
      <div className="p-6 flex-grow flex flex-col bg-white">
        <div className="flex flex-col flex-grow">
          
          {/* Role badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#5046e5] bg-opacity-80">
              {roleLabels[member.role] || member.role}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            
            {/* Nationality */}
            <div className="flex items-center gap-1">
              {member.country && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{member.country}</span>
              )}
            </div>
          </div>
          
          {/* Member Name */}
          <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors duration-300">
            {member.name}
          </h3>
          
          {member.englishName && (
            <div className="text-[11px] text-slate-400 font-semibold tracking-wide mt-0.5">{member.englishName}</div>
          )}
          
          {/* Short description / Status */}
          {member.description && member.description !== member.role && (
            <p className="text-xs text-slate-500 font-medium mt-1.5">
              {member.description}
            </p>
          )}

          {/* Education background - Formatted on a single neat line */}
          {member.education && member.education.length > 0 && (
            <div className="mt-auto pt-4 border-t border-slate-100/80 flex items-start gap-2">
              <GraduationCap size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed" title={member.education.join(", ")}>
                {member.education.join(", ")}
              </p>
            </div>
          )}

          {/* Email link */}
          {member.email && (
            <a 
              href={`mailto:${member.email}`} 
              className="mt-3 pt-3 border-t border-slate-50 flex items-center text-[11px] text-slate-400 hover:text-indigo-600 font-semibold transition-colors truncate"
            >
              <Mail size={12} className="mr-1.5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
              <span className="truncate">{member.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
