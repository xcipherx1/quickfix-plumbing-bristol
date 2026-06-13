"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = ['Emergency Plumbing', 'Residential', 'Commercial', 'Heating', 'Drainage', 'Gas Safety'];
const areaLinks = ['Bristol Areas', 'Bath Areas', 'All Service Areas'];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              QuickFix<span className="text-[#06B6D4]">.</span>
            </span>
            <p className="text-white/60 text-sm mt-3 mb-6">
              Bristol's trusted emergency plumbers. 24/7, 365 days.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#06B6D4]/20 hover:text-[#06B6D4] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-white/50 hover:text-[#06B6D4] transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {areaLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => document.querySelector('#areas')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-white/50 hover:text-[#06B6D4] transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                123 High Street, St George, Bristol BS5 7XX
              </li>
              <li>
                <a href="tel:01172345678" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#06B6D4] transition-colors">
                  <Phone className="w-4 h-4 text-[#06B6D4]" />
                  0117 234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@quickfixbristol.co.uk" className="flex items-center gap-2 text-sm text-white/50 hover:text-[#06B6D4] transition-colors">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  info@quickfixbristol.co.uk
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="tel:01172345678"
                  className="inline-flex items-center gap-2 bg-[#EF4444] text-white px-4 py-2 rounded-full text-sm font-semibold animate-emergency-pulse"
                >
                  <Phone className="w-4 h-4" /> Emergency Line
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © 2026 QuickFix Plumbing Bristol LTD. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-white/40">
            <a href="#" className="hover:text-[#06B6D4] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#06B6D4] transition-colors">Terms</a>
            <Link href="/admin/login" className="hover:text-[#06B6D4] transition-colors">Dashboard Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
