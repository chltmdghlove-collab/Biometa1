import { motion } from "motion/react";
import { labData } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import { Mail, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SoapBubblePlayground from "../components/SoapBubblePlayground";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      setError("서버와의 통신에 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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

      {/* Interactive Soap Bubble Playground Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-20"
      >
        <SoapBubblePlayground />
      </motion.div>

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
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-150 bg-slate-950 aspect-video w-full"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_ZfZzhlVlWM"
              title="Laboratory Research Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>
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
                <option value="internship">학부 연구생 지원 (Undergraduate Internship)</option>
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

            {error && (
              <p className="text-sm text-red-500 font-medium px-1">{error}</p>
            )}

            <button 
              type="submit" 
              className="w-full btn-primary flex justify-center items-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitted || loading}
            >
              {loading ? "전송 중..." : submitted ? "전송 완료!" : (
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
