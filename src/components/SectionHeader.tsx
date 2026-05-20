import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-slate-900 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
      </h2>
      {subtitle && <p className="mt-4 text-slate-500 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}
