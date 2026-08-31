'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, BookOpen, Sparkles, Shield,
  AlertCircle, ArrowRight, Building2, CheckCircle2,
} from 'lucide-react';

/** localStorage flag — set once a visitor has acknowledged this screen. */
export const WELCOME_ACK_KEY = 'lms_welcome_ack_v1';

const UET_WEBSITE = 'https://uet.edu.pk';

const FEATURES = [
  { icon: BookOpen, title: 'Academic Modules', desc: 'Timetables, offered subjects, course selection and the academic calendar.' },
  { icon: GraduationCap, title: 'Results & DMC', desc: 'Semester-wise results, GPA overview and recheck requests.' },
  { icon: Building2, title: 'Campus Services', desc: 'Hostel, fees & challans, scholarships, clearance and surveys.' },
  { icon: Sparkles, title: 'AI Assistant', desc: 'Ask about degree programs, admissions and campus information.' },
];

/** The university name, always linked to the official UET Lahore website. */
function UetLink() {
  return (
    <a
      href={UET_WEBSITE}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-blue-400 underline underline-offset-2 decoration-blue-400/40 hover:text-blue-300 hover:decoration-blue-300 transition-colors"
    >
      UET Lahore
    </a>
  );
}

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] flex items-center justify-center p-4 py-10 sm:py-12">
      {/* ambient glows — same treatment as the sign-in screen */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" aria-hidden="true" />

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-9">
          {/* header */}
          <div className="flex flex-col items-center text-center">
            <motion.img
              src="/uet-logo.png"
              alt="UET Lahore logo"
              className="w-20 h-20 object-contain mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.15 }}
            />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[11px] font-medium text-amber-300">
              <AlertCircle className="w-3 h-3" />
              Unofficial &middot; Educational Project
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                UET Lahore LMS
              </span>
            </h1>
            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/50">
              A student-built, AI-powered demonstration of a university Learning Management System —
              courses, results, fees and campus services in one place.
            </p>
          </div>

          {/* what is inside */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-600/15 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-white/90">{f.title}</h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/40">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* disclaimer */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            aria-labelledby="welcome-disclaimer-title"
            className="mt-7 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4 sm:p-5"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0 text-amber-300" />
              <h2 id="welcome-disclaimer-title" className="text-sm font-semibold text-amber-200">
                Disclaimer
              </h2>
            </div>
            <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-white/55">
              This website is an{' '}
              <strong className="font-semibold text-white/75">independent, unofficial clone</strong> of a
              university Learning Management System, created solely for{' '}
              <strong className="font-semibold text-white/75">educational and demonstration purposes</strong>.
              It is not affiliated with, endorsed by, or connected to the University of Engineering and
              Technology, Lahore (<UetLink />) in any way.
            </p>
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/55">
              All institutional names, logos, crests and marks used here — including the name and logo of{' '}
              <UetLink /> — are the trademarks and property of their respective owners, and are shown only
              to illustrate the interface. No official university records are served by this application:
              every academic detail you see is sample or auto-generated data.
            </p>
          </motion.section>

          {/* actions */}
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={onContinue}
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              I understand &mdash; Continue
            </Button>
            <a
              href={UET_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-2 py-2 rounded-lg text-center text-xs text-white/40 hover:text-blue-400 transition-colors"
            >
              Visit the official UET Lahore site
              <ArrowRight className="w-3 h-3 inline ml-1" />
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-[11px] text-white/20">
          Built by{' '}
          <a
            href="https://musab-007.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/40 transition-colors"
          >
            Musab Dawood
          </a>
        </p>
      </motion.main>
    </div>
  );
}
