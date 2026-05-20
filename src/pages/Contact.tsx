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
  const [isMocked, setIsMocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setIsMocked(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (data.success) {
        setIsMocked(!!data.isMock);
        setSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        // Keep notice visible longer if mocked so user can read instructions
        setTimeout(() => setSubmitted(false), data.isMock ? 12000 : 6000);
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

            {submitted && isMocked && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-xl text-sm leading-relaxed space-y-1.5 transition-all">
                <p className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  ⚠️ 실제 이메일전송 불가 (시뮬레이션 전송됨)
                </p>
                <p className="text-xs">
                  현재 AI Studio의 <strong>RESEND_API_KEY</strong> 환경 변수(인프라 비밀 키)가 비어 있거나 올바르지 않아 가상 전송이 접수되었습니다.
                </p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                  <strong>실제 연동을 완료하려면:</strong> AI Studio 창 우측 상단의 <strong>Settings (톱니바퀴 아이콘) &gt; Secrets</strong> 패널에서 <code>RESEND_API_KEY</code> 이름으로 Resend API 키를 빈 공간 없이 등록해주세요!
                </p>
              </div>
            )}

            {submitted && !isMocked && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 rounded-xl text-sm leading-relaxed transition-all">
                <p className="font-bold flex items-center gap-1.5">
                  ✨ 이메일 발송 완료!
                </p>
                <p className="text-xs mt-1">
                  문의 사항이 지정된 이메일 계정({labData.contact.email})으로 정상 발송되었습니다. 신속하게 확인 후 답장 드리겠습니다!
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full btn-primary flex justify-center items-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitted || loading}
            >
              {loading ? "전송 중..." : submitted ? "접수 완료" : (
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
