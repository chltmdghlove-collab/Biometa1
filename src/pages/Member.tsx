import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import MemberCard from "../components/MemberCard";
import { Helmet } from "react-helmet-async";

export default function Member() {
  const rolesOrder = ['PhD', 'Master', 'Undergraduate', 'Alumni'];
  
  return (
    <div className="section-padding">
      <Helmet>
        <title>Members | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Our Members" 
        subtitle="우리는 서로의 다양성을 존중하며, 공동의 목표를 향해 협력하는 젊고 역동적인 연구 커뮤니티입니다."
      />

      {/* Professor Section */}
      <div className="mb-24">
        <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 uppercase tracking-wider">Principal Investigator</h3>
        <div className="max-w-xs">
          <MemberCard member={{
            id: 'PI',
            name: labData.professor.name,
            role: 'Professor',
            email: labData.professor.email,
            image: labData.professor.image,
            description: labData.professor.title
          }} />
        </div>
      </div>

      {/* Other Members Grouped by Role */}
      {rolesOrder.map((role) => {
        const roleMembers = labData.members.filter(m => m.role === role);
        if (roleMembers.length === 0) return null;

        const roleTitle = role === 'PhD' ? 'Ph.D. Students' : 
                          role === 'Master' ? 'Master Students' : 
                          role === 'Undergraduate' ? 'Undergraduate Researchers' : 'Alumni';

        return (
          <div key={role} className="mb-24">
            <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 uppercase tracking-wider">{roleTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {roleMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
