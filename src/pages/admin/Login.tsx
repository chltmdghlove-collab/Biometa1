import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would hit /api/admin/login
    if (username === "admin" && password === "biometa2024") {
      localStorage.setItem("admin_token", "mock-token");
      navigate("/admin/dashboard");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
      <Helmet>
        <title>Admin Login | Biometamaterials Lab</title>
      </Helmet>

      <div className="w-full max-w-md bg-white p-12 rounded-3xl border border-slate-100 shadow-2xl">
        <div className="text-center mb-10">
          <div className="text-primary font-bold text-4xl mb-4">Admin</div>
          <p className="text-slate-400 text-sm">관리자 계정으로 로그인해 주세요.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Manager ID"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary flex justify-center items-center py-4 text-lg">
            Sign In <ArrowRight className="ml-2" size={18} />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          <p>Demo ID: admin / PW: biometa2024</p>
        </div>
      </div>
    </div>
  );
}
