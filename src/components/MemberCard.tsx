import { Member } from "../data/mockData";
import { Mail } from "lucide-react";

interface MemberCardProps {
  member: Member;
}

const roleLabels: Record<string, string> = {
  Professor: "Professor",
  PostDoc: "Postdoctoral Researcher",
  PhD: "Ph.D. Student",
  Master: "Master Student",
  Undergraduate: "Undergraduate Researcher",
  Alumni: "Alumni"
};

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300">
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="text-primary font-bold text-xs uppercase tracking-widest mb-1">
          {roleLabels[member.role]}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
        {member.description && (
          <p className="text-sm text-slate-500 mb-4 line-clamp-2">{member.description}</p>
        )}
        {member.email && (
          <a 
            href={`mailto:${member.email}`} 
            className="flex items-center text-xs text-slate-400 hover:text-primary transition-colors"
          >
            <Mail size={14} className="mr-1.5" />
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
}
