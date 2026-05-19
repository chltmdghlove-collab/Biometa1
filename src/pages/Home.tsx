import { motion } from "motion/react";
import { ArrowRight, Beaker, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { labData } from "../data/mockData";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{labData.labName} | Home</title>
        <meta name="description" content={labData.subtitle} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Lab Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="section-padding relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Welcome to Biometamaterials Lab
            </div>
            <h1 className="text-[57px] font-bold text-white leading-tight mb-8">
              {labData.vision}
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              {labData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary flex items-center">
                연구생 지원하기 <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/research" className="px-6 py-3 border border-white/20 text-white rounded-md font-medium hover:bg-white/10 transition-all">
                연구 분야 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Publications", value: "50+", icon: <FileText size={20} className="text-primary" /> },
            { label: "Patents", value: "12", icon: <Beaker size={20} className="text-primary" /> },
            { label: "Members", value: "15", icon: <Users size={20} className="text-primary" /> },
            { label: "Research Score", value: "9.8", icon: <ArrowRight size={20} className="text-primary" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <div className="p-3 bg-slate-50 rounded-lg">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Research */}
      <section className="section-padding bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Research Fields</h2>
            <p className="text-slate-500">우리는 생명과학과 재료공학의 교차점에서 새로운 가능성을 탐구합니다.</p>
          </div>
          <Link to="/research" className="text-primary font-bold flex items-center group">
            View All Research <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {labData.researchFields.map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl aspect-[4/5]"
            >
              <img src={field.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={field.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">{field.title}</h3>
                <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {field.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest News CTA */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Join Our Research Team</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Biometamaterials 연구실은 열정적으로 도전하고 함께 성장할 연구원을 상시 모집하고 있습니다. 
            당신의 창의적인 아이디어가 인류의 건강을 위한 혁신으로 이어질 수 있습니다.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact" className="btn-primary">Apply Now</Link>
            <Link to="/member" className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-md font-medium hover:bg-slate-50 transition-all">Meet Our Members</Link>
          </div>
        </div>
      </section>
    </>
  );
}
