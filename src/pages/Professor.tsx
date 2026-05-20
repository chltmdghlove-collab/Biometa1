import { motion } from "motion/react";
import { Mail, GraduationCap, Briefcase } from "lucide-react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Helmet } from "react-helmet-async";

export default function Professor() {
  const { professor } = labData;

  return (
    <div className="section-padding">
      <Helmet>
        <title>Professor | {labData.labName}</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Profile Image & Basic Info */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-2xl">
              <img 
                src={professor.image}
                className="w-full h-full object-cover" 
                alt={professor.englishName}
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">{professor.englishName}</h1>
            
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center text-slate-600">
                <Mail className="mr-3 text-primary" size={20} />
                <a href={`mailto:${professor.email}`} className="hover:text-primary transition-colors underline underline-offset-4 decoration-primary/20">
                  {professor.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Detailed Info */}
        <div className="lg:col-span-8 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionHeader title="Education" />
            <div className="space-y-4">
              {professor.biography.map((edu, i) => (
                <div key={i} className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <p className="text-slate-700 leading-loose">{edu}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionHeader title="Professional Career" />
            <div className="space-y-4">
              {professor.careers.map((career, i) => (
                <div key={i} className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
                    <Briefcase size={20} />
                  </div>
                  <p className="text-slate-700 leading-loose">{career}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
