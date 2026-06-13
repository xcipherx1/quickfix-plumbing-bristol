"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  CheckCircle,
  AlertTriangle,
  Wrench,
  ArrowRight,
  Copy,
  Shield,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SetupState {
  status: "checking" | "needsSetup" | "seeding" | "done" | "error";
  message?: string;
  credentials?: {
    admin: { email: string; password: string };
    manager: { email: string; password: string };
    staff: { email: string; password: string };
  };
}

export default function SetupPage() {
  const [state, setState] = useState<SetupState>({ status: "checking" });

  useEffect(() => {
    checkDatabase();
  }, []);

  async function checkDatabase() {
    try {
      const res = await fetch("/api/admin/users", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.users && data.users.length > 0) {
          setState({ status: "done", message: "Database is already set up!" });
          return;
        }
      }
      setState({ status: "needsSetup" });
    } catch {
      setState({ status: "needsSetup" });
    }
  }

  async function runSetup() {
    setState({ status: "seeding" });
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: {
          "x-seed-key": "quickfix-internal-seed-key",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Setup failed");
      }

      const data = await res.json();
      setState({
        status: "done",
        message: "Database seeded successfully!",
        credentials: data.credentials,
      });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-[#06B6D4]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            QuickFix Setup
          </h1>
          <p className="text-sm text-[#0F172A]/60 mt-2">
            One-click database initialization
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento p-6">
          {/* Checking */}
          {state.status === "checking" && (
            <div className="flex items-center justify-center py-8 gap-3 text-[#0F172A]/60">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Checking database status...</span>
            </div>
          )}

          {/* Needs Setup */}
          {state.status === "needsSetup" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Database is empty
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    Your database tables are created, but there is no data yet.
                    Click the button below to seed the database with sample
                    users, leads, and activity logs.
                  </p>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 text-sm text-[#0F172A]/70 space-y-2">
                <p className="font-medium text-[#0F172A]">
                  This will create:
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#06B6D4]" />3 admin users
                    (admin, manager, staff)
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#06B6D4]" />
                    10 sample leads with varied statuses
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#06B6D4]" />6 activity log
                    entries
                  </li>
                </ul>
              </div>

              <Button
                onClick={runSetup}
                className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold py-3 rounded-xl"
              >
                <Database className="w-4 h-4 mr-2" />
                Setup Database
              </Button>
            </div>
          )}

          {/* Seeding */}
          {state.status === "seeding" && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
              <p className="text-sm text-[#0F172A]/60">
                Creating tables and seeding data...
              </p>
            </div>
          )}

          {/* Done */}
          {state.status === "done" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {state.message}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Your dashboard is ready. Use the credentials below to log
                    in.
                  </p>
                </div>
              </div>

              {state.credentials && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#0F172A]">
                    Login Credentials
                  </p>
                  {Object.entries(state.credentials).map(
                    ([role, creds]: [string, any]) => (
                      <CredentialCard
                        key={role}
                        role={role}
                        email={creds.email}
                        password={creds.password}
                      />
                    )
                  )}
                </div>
              )}

              <Button
                onClick={() => (window.location.href = "/admin/login")}
                className="w-full bg-[#0F172A] hover:bg-[#0F172A]/90 text-white font-semibold py-3 rounded-xl"
              >
                Go to Login <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Error */}
          {state.status === "error" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Setup failed
                  </p>
                  <p className="text-sm text-red-700 mt-1">{state.message}</p>
                </div>
              </div>

              <Button
                onClick={runSetup}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#0F172A]/40 mt-6">
          QuickFix Plumbing Bristol LTD &copy; 2026
        </p>
      </motion.div>
    </div>
  );
}

function CredentialCard({
  role,
  email,
  password,
}: {
  role: string;
  email: string;
  password: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    manager: "bg-blue-100 text-blue-800 border-blue-200",
    staff: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
            roleColors[role] || roleColors.staff
          }`}
        >
          {role}
        </span>
        <button
          onClick={() => copy(`${email}:${password}`)}
          className="text-xs text-[#06B6D4] hover:underline flex items-center gap-1"
        >
          {copied ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copied ? "Copied!" : "Copy all"}
        </button>
      </div>
      <div className="text-sm space-y-1">
        <p className="text-[#0F172A]/70">
          <span className="text-[#0F172A]/40">Email:</span>{" "}
          <span className="font-mono text-[#0F172A]">{email}</span>
        </p>
        <p className="text-[#0F172A]/70">
          <span className="text-[#0F172A]/40">Password:</span>{" "}
          <span className="font-mono text-[#0F172A]">{password}</span>
        </p>
      </div>
    </div>
  );
}
