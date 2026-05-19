import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="section-padding">
      <Helmet>
        <title>Contact | {labData.labName}</title>
      </Helmet>

      <SectionHeader 
        title="Contact Us" 
        subtitle="우리 연구실에 대해 궁금한 점이나 입학 상담, 공동 연구 문의는 아래의 연락처를 이용해 주세요."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info & Map */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-lg mr-6">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Laboratory Location</h4>
                <p className="text-slate-600 leading-relaxed">{labData.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-lg mr-6">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Email Inquiry</h4>
                <p className="text-slate-600 leading-relaxed">{labData.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-lg mr-6">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Telephone</h4>
                <p className="text-slate-600 leading-relaxed">{labData.contact.phone}</p>
              </div>
            </div>
          </div>

          <div className="h-80 bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-8 text-center">
              <MapPin size={48} className="mb-4 opacity-20" />
              <p className="font-medium">지도 API 연결 예정 (Google Maps/Kakao Maps)</p>
              <p className="text-xs mt-2">{labData.contact.address}</p>
            </div>
          </div>
        </div>

        {/* Application/Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">연구원 지원 및 문의</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="홍길동"
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="example@mail.com"
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Subject</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formState.subject}
                onChange={e => setFormState({...formState, subject: e.target.value})}
              >
                <option value="">문의 유형 선택</option>
                <option value="admission">대학원 신입생 지원 (Admission)</option>
                <option value="research">공동 연구 제안 (Collaboration)</option>
                <option value="visit">Lab Tour/방문 문의</option>
                <option value="etc">기타 문의</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="문의 내용을 상세히 기술해 주세요."
                required
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary flex justify-center items-center py-4 text-lg"
              disabled={submitted}
            >
              {submitted ? "전송 완료!" : (
                <>
                  Send Message <Send size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
