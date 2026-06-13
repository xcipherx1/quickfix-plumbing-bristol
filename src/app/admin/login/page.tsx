"use client";

import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Full page reload to refresh auth state
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-[60%] bg-[#0F172A] flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Wrench
            className="absolute text-white"
            style={{ left: "10%", top: "20%", transform: "rotate(15deg)", width: 40, height: 40 }}
          />
          <Wrench
            className="absolute text-white"
            style={{ left: "70%", top: "60%", transform: "rotate(140deg)", width: 30, height: 30 }}
          />
          <Wrench
            className="absolute text-white"
            style={{ left: "40%", top: "80%", transform: "rotate(75deg)", width: 50, height: 50 }}
          />
          <Wrench
            className="absolute text-white"
            style={{ left: "85%", top: "15%", transform: "rotate(200deg)", width: 25, height: 25 }}
          />
          <Wrench
            className="absolute text-white"
            style={{ left: "20%", top: "70%", transform: "rotate(300deg)", width: 35, height: 35 }}
          />
        </div>
        <div className="relative z-10 text-center px-12">
          <span className="text-4xl font-extrabold text-white tracking-tight">
            QuickFix<span className="text-[#06B6D4]">.</span>
          </span>
          <p className="text-white/50 mt-4 text-lg">
            Lead Management Dashboard
          </p>
          <p className="text-white/30 mt-2 text-sm">
            Manage leads, track performance, grow your business.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC] p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-2xl font-extrabold text-[#0F172A] tracking-tight md:hidden">
              QuickFix<span className="text-[#06B6D4]">.</span>
            </span>
            <h1 className="text-2xl font-bold text-[#0F172A] mt-4">
              Welcome Back
            </h1>
            <p className="text-sm text-[#0F172A]/60 mt-1">
              Sign in to your admin account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/30" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/30" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F172A]/30 hover:text-[#0F172A]/60"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold py-3 rounded-xl"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-[#06B6D4] hover:underline"
              >
                Back to website
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
