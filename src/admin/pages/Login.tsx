import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login - accept any email/password
    setTimeout(() => {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_user', JSON.stringify({ name: 'John Smith', email, role: 'admin' }));
      toast.success('Signed in successfully');
      navigate('/admin/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Dark Background */}
      <div className="hidden md:flex md:w-[60%] bg-[#0F172A] flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <Wrench
              key={i}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <span className="text-4xl font-extrabold text-white tracking-tight">
            QuickFix<span className="text-[#06B6D4]">.</span>
          </span>
          <p className="text-white/50 mt-4 text-lg">Lead Management Dashboard</p>
          <p className="text-white/30 mt-2 text-sm">Manage leads, track performance, grow your business.</p>
        </motion.div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC] p-6">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <span className="text-2xl font-extrabold text-[#0F172A] tracking-tight md:hidden">
              QuickFix<span className="text-[#06B6D4]">.</span>
            </span>
            <h1 className="text-2xl font-bold text-[#0F172A] mt-4">Welcome Back</h1>
            <p className="text-sm text-[#0F172A]/60 mt-1">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/30" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/30" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F172A]/30 hover:text-[#0F172A]/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#0F172A]/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#06B6D4] hover:underline">Forgot password?</a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold py-3 rounded-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
