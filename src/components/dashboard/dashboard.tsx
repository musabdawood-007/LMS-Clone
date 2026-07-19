'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, BookOpen, Clock, GraduationCap, CheckSquare, Award,
  Building2, XCircle, MessageSquareWarning,
  FileText, RotateCcw, Receipt, DollarSign, FilePlus,
  User, ClipboardCheck, Stethoscope, UserCheck, ArrowLeftRight,
  FileSearch, BarChart3, MessageSquare, LogOut, PenTool, Star,
  ChevronRight, ChevronDown, Home, Menu, X, Sparkles, Send, Loader2, Bot,
  LayoutDashboard, ArrowLeft, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { renderModuleView } from './module-views';
import { type StudentProfile, DEPARTMENTS, ALL_PROGRAMS, getProgramById, getCoursesForSemester, generateResultsForStudent } from '@/lib/curriculum';

/* ═══════════════════════════════════════════════════════════════════════
   MODULE DATA
   ═══════════════════════════════════════════════════════════════════════ */
export interface ModuleItem {
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info';
}

export interface ModuleCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  modules: ModuleItem[];
}

export const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    id: 'academic', title: 'Academic', icon: GraduationCap, color: '#2563eb',
    modules: [
      { slug: 'academic-calendar', title: 'Academic Calendar', description: 'View term dates, holidays, and exam windows', icon: Calendar, badge: '3 Events', badgeVariant: 'info' },
      { slug: 'offered-subjects', title: 'Offered Subjects', description: 'Browse subjects for your active semester', icon: BookOpen },
      { slug: 'dept-timetable', title: 'Department Timetable', description: 'Department-level class schedule view', icon: Clock },
      { slug: 'student-timetable', title: 'My Timetable', description: 'Your personal class schedule', icon: Clock, badge: 'Live', badgeVariant: 'success' },
      { slug: 'course-selection', title: 'Course Selection', description: 'Select courses for the current semester', icon: CheckSquare, badge: 'Open', badgeVariant: 'warning' },
      { slug: 'elective-course', title: 'Set Elective Course', description: 'Choose electives from allowed pools', icon: BookOpen },
      { slug: 'apply-convocation', title: 'Apply Convocation', description: 'Submit and track convocation application', icon: Award },
    ],
  },
  {
    id: 'hostel', title: 'Hostel', icon: Building2, color: '#7c3aed',
    modules: [
      { slug: 'hostel-admission', title: 'Hostel Admission', description: 'Apply for hostel seat with preferences', icon: Building2, badge: 'Open', badgeVariant: 'success' },
      { slug: 'hostel-cancel', title: 'Hostel Cancel', description: 'Request cancellation of hostel allotment', icon: XCircle },
      { slug: 'hostel-complaint', title: 'Hostel Complaint', description: 'Submit comments or complaints to staff', icon: MessageSquareWarning, badge: '1 Pending', badgeVariant: 'danger' },
    ],
  },
  {
    id: 'results', title: 'Results', icon: FileText, color: '#059669',
    modules: [
      { slug: 'view-dmc', title: 'View DMC', description: 'View and download your Detailed Marks Certificate', icon: FileText, badge: 'Available', badgeVariant: 'success' },
      { slug: 'recheck-request', title: 'Recheck Request', description: 'Submit recheck request for a subject', icon: RotateCcw },
    ],
  },
  {
    id: 'fees', title: 'Fees & Challans', icon: Receipt, color: '#d97706',
    modules: [
      { slug: 'fee-challan', title: 'Fee Challan', description: 'Generate or view fee challans', icon: Receipt, badge: 'Due', badgeVariant: 'danger' },
      { slug: 'fee-summary', title: 'Fee Summary', description: 'Overview of paid, pending, and overdue fees', icon: DollarSign },
      { slug: 'misc-challan', title: 'Miscellaneous Challan', description: 'Create or view miscellaneous charges', icon: FilePlus },
    ],
  },
  {
    id: 'services', title: 'Student Services', icon: User, color: '#e11d48',
    modules: [
      { slug: 'student-profile', title: 'Student Profile', description: 'View and edit your academic profile', icon: User },
      { slug: 'student-clearance', title: 'Student Clearance', description: 'Clearance request across departments', icon: ClipboardCheck, badge: 'Pending', badgeVariant: 'warning' },
      { slug: 'pec-registration', title: 'PEC Registration', description: 'PEC registration form and tracking', icon: Stethoscope },
      { slug: 'student-mentoring', title: 'Student Mentoring', description: 'Mentoring assignments and meeting records', icon: UserCheck },
      { slug: 'readmission', title: 'Re-Admission Request', description: 'Apply for re-admission to the program', icon: ArrowLeftRight },
      { slug: 'thesis-track', title: 'Thesis Track', description: 'Track thesis milestones and supervisor', icon: FileSearch },
      { slug: 'reports', title: 'Reports', description: 'Downloadable academic and admin reports', icon: BarChart3 },
    ],
  },
  {
    id: 'scholarship', title: 'Scholarship', icon: Star, color: '#ea580c',
    modules: [
      { slug: 'apply-scholarship', title: 'Apply Scholarship', description: 'Application, documents, and status tracking', icon: Star, badge: 'Open', badgeVariant: 'success' },
    ],
  },
  {
    id: 'surveys', title: 'Surveys', icon: MessageSquare, color: '#0891b2',
    modules: [
      { slug: 'survey-subjects', title: 'Course Survey', description: 'Per-subject course feedback surveys', icon: MessageSquare, badge: '2 New', badgeVariant: 'danger' },
      { slug: 'exit-survey', title: 'Exit Survey', description: 'End-of-program feedback survey', icon: PenTool },
      { slug: 'university-survey', title: 'University Survey', description: 'General institutional survey', icon: MessageSquare },
    ],
  },
];

export function findModule(slug: string): ModuleItem | undefined {
  for (const cat of MODULE_CATEGORIES) {
    const m = cat.modules.find((m) => m.slug === slug);
    if (m) return m;
  }
  return undefined;
}

export function findCategoryForModule(slug: string): ModuleCategory | undefined {
  return MODULE_CATEGORIES.find((cat) => cat.modules.some((m) => m.slug === slug));
}

/* ═══════════════════════════════════════════════════════════════════════
   PROFILE SETUP MODAL (first-time users set their department/semester)
   ═══════════════════════════════════════════════════════════════════════ */
function ProfileSetupModal({ onComplete }: { onComplete: (profile: StudentProfile) => void }) {
  const [departmentId, setDepartmentId] = useState('cs');
  const [programId, setProgramId] = useState('cs-bsc');
  const [semester, setSemester] = useState('5');
  const [semesterType, setSemesterType] = useState('fall');
  const [rollNumber, setRollNumber] = useState('2022-CS-001');
  const [saving, setSaving] = useState(false);

  const programs = ALL_PROGRAMS.filter((p) => p.departmentId === departmentId);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('lms_token');
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          departmentId,
          departmentName: DEPARTMENTS.find((d: any) => d.id === departmentId)?.name || departmentId,
          programId,
          programName: ALL_PROGRAMS.find((p: any) => p.id === programId)?.name || programId,
          currentSemester: parseInt(semester),
          semesterType,
          rollNumber,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const data = await res.json();
      onComplete({
        userId: '', departmentId, departmentName: '', programId, programName: '',
        currentSemester: parseInt(semester), semesterType, rollNumber,
      });
      toast.success('Profile saved!');
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-blue-50 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Setup Your Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Tell us about your academic details to personalize your LMS experience.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Department</label>
            <select value={departmentId} onChange={(e) => { setDepartmentId(e.target.value); setProgramId(''); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
              {DEPARTMENTS.map((d) => <option key={d.id} value={d.id}>{d.name} ({d.campus})</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Degree Program</label>
            <select value={programId} onChange={(e) => setProgramId(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
              <option value="">Select program...</option>
              {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Current Semester</label>
              <select value={semester} onChange={(e) => setSemester(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => <option key={s} value={String(s)}>Semester {s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Semester Type</label>
              <select value={semesterType} onChange={(e) => setSemesterType(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Roll Number</label>
            <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="e.g. 2022-CS-001" />
          </div>
        </div>

        <Button onClick={handleSave} disabled={!programId || saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {saving ? 'Saving...' : 'Continue to Dashboard'}
        </Button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════════════════ */
function Sidebar({
  activeModule, onNavigate, expandedCategories, toggleCategory,
  onLogout, userName, collapsed, onToggleCollapse, onCloseMobile,
}: {
  activeModule: string | null;
  onNavigate: (slug: string) => void;
  expandedCategories: Set<string>;
  toggleCategory: (id: string) => void;
  onLogout: () => void;
  userName: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}) {
  const badgeColors: Record<string, string> = {
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <aside className={`h-full flex flex-col bg-[#0f172a] border-r border-white/[0.06] transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>
      {/* UET Logo */}
      <div className="flex items-center gap-3 px-4 h-[64px] border-b border-white/[0.06] shrink-0">
        <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
          <img src="/uet-logo.png" alt="UET" className="w-6 h-6 object-contain" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h2 className="text-[13px] font-bold text-white leading-tight tracking-tight">UET Lahore</h2>
            <p className="text-[10px] text-slate-500 leading-tight">Learning Management System</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 py-2">
        <button
          onClick={() => { onNavigate('__home__'); onCloseMobile(); }}
          className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${
            !activeModule ? 'bg-blue-600/15 text-blue-400' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span className="font-medium">Dashboard</span>}
        </button>

        <div className="h-px bg-white/[0.06] mx-3 my-2" />

        {MODULE_CATEGORIES.map((cat) => {
          const isExpanded = expandedCategories.has(cat.id);
          const isActive = cat.modules.some((m) => m.slug === activeModule);
          return (
            <div key={cat.id}>
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors group ${
                  isActive ? 'text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                <cat.icon className="w-[18px] h-[18px] shrink-0" style={{ color: isActive ? cat.color : undefined }} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{cat.title}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
              <AnimatePresence>
                {isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {cat.modules.map((mod) => (
                      <button
                        key={mod.slug}
                        onClick={() => { onNavigate(mod.slug); onCloseMobile(); }}
                        className={`w-full flex items-center gap-2.5 pl-10 pr-4 py-[7px] text-[12.5px] transition-colors ${
                          activeModule === mod.slug
                            ? 'text-white bg-white/[0.08]'
                            : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-300'
                        }`}
                      >
                        <div className={`w-1 h-1 rounded-full shrink-0 ${activeModule === mod.slug ? 'bg-blue-400' : 'bg-slate-700'}`} />
                        <span className="flex-1 text-left truncate">{mod.title}</span>
                        {mod.badge && mod.badgeVariant && (
                          <span className={`text-[9px] px-1.5 py-px rounded-full font-medium ${badgeColors[mod.badgeVariant]}`}>
                            {mod.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </ScrollArea>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] p-2 shrink-0 space-y-0.5">
        <button onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-white/[0.04] hover:text-slate-300 transition-colors text-[12px]">
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
        {!collapsed && (
          <div className="px-3 py-2">
            <p className="text-[10px] text-slate-600">Logged in as</p>
            <p className="text-[12px] font-medium text-slate-300 truncate">{userName}</p>
          </div>
        )}
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors text-[12px]">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        {!collapsed && (
          <div className="px-3 pt-2 pb-1">
            <a href="https://musab-007.netlify.app" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-blue-400 transition-colors">
              Built by <span className="font-semibold text-slate-500">Musab Dawood</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AI ASSISTANT — Knows user profile data
   ═══════════════════════════════════════════════════════════════════════ */
interface ChatMessage { role: 'user' | 'assistant'; content: string; }

function AIPanel({ isOpen, onClose, profile }: { isOpen: boolean; onClose: () => void; profile: StudentProfile | null }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I\'m your UET LMS AI Assistant. I can help you with academics, fees, hostel, courses, results, and more. I also know your academic profile — just ask! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((p) => [...p, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      // Build user context for AI
      let userContext = '';
      if (profile) {
        const courses = getCoursesForSemester(profile.programId, profile.currentSemester);
        const results = generateResultsForStudent(profile.programId, profile.currentSemester);
        const lastResult = results.length > 0 ? results[results.length - 1] : null;
        const cgpa = results.length > 0
          ? (results.reduce((s: number, r: any) => s + r.gpa, 0) / results.length).toFixed(2)
          : 'N/A';

        userContext = `\n\nSTUDENT PROFILE DATA (use this to answer questions about the student):\n` +
          `- Name: (check from auth)\n` +
          `- Department: ${profile.departmentName}\n` +
          `- Program: ${profile.programName}\n` +
          `- Current Semester: ${profile.currentSemester} (${profile.semesterType})\n` +
          `- Roll Number: ${profile.rollNumber}\n` +
          `- Cumulative GPA (CGPA): ${cgpa}\n` +
          `- Last Semester GPA: ${lastResult ? lastResult.gpa : 'N/A'}\n` +
          `- Total Semesters Completed: ${results.length}\n` +
          `- Current Semester Courses (${courses.length}):\n${courses.map((c) => `  * ${c.code}: ${c.name} (${c.credits}) [${c.type}]`).join('\n')}\n` +
          `- Past Results Summary:\n${results.map((r) => `  Sem ${r.semester} (${r.semesterType}): GPA ${r.gpa} — ${r.courses.length} courses`).join('\n')}`;
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a helpful, knowledgeable AI assistant for UET Lahore LMS (Learning Management System). You help students with academics, fees, hostel, courses, results, scholarship, surveys, and general university information. Be concise, professional, and friendly.

${userContext}

IMPORTANT: If someone asks "who built this" or "who made this LMS" or "who is the developer", you MUST say: "This LMS was built by Musab Dawood. You can check out his portfolio at https://musab-007.netlify.app"

When the student asks about their GPA, courses, semester, results, or academic standing — use the STUDENT PROFILE DATA above to give accurate answers. If profile data is not available, ask the student to set up their profile first.`,
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg },
          ],
        }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: 'assistant', content: data.reply || 'Sorry, I could not process your request.' }]);
    } catch {
      setMessages((p) => [...p, { role: 'assistant', content: 'I\'m having trouble connecting. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">UET LMS AI Assistant</h3>
                <p className="text-[10px] text-slate-400">Knows your profile — ask about GPA, courses, etc.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-700 rounded-bl-md'
                }`}>{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about your GPA, courses, fees..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors disabled:opacity-40"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Send className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WELCOME SCREEN
   ═══════════════════════════════════════════════════════════════════════ */
function WelcomeScreen({ userName, onDismiss }: { userName: string; onDismiss: () => void }) {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 3 + Math.random() * 4, dur: 3 + Math.random() * 4,
    }))
  );
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 cursor-pointer"
      onClick={onDismiss}
    >
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-blue-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.id * 0.2 }}
        />
      ))}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', damping: 15 }}
        className="text-center max-w-md px-6"
      >
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.1, damping: 12 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm"
        >
          <img src="/uet-logo.png" alt="UET Lahore" className="w-16 h-16 object-contain" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
        >
          Welcome to <span className="text-blue-400">UET LMS</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="text-base text-slate-400 mb-1"
        >
          University of Engineering & Technology, Lahore
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="text-sm text-slate-500 mb-8"
        >
          AI-Powered Learning Management System
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20"
        >
          <span className="text-sm text-slate-400">Welcome,</span>
          <span className="text-sm font-semibold text-blue-400">{userName}</span>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="text-xs text-slate-600 mt-10"
        >Tap anywhere to continue</motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME DASHBOARD VIEW
   ═══════════════════════════════════════════════════════════════════════ */
function HomeView({ onNavigate, userName, profile }: { onNavigate: (slug: string) => void; userName: string; profile: StudentProfile | null }) {
  const totalModules = MODULE_CATEGORIES.reduce((a, c) => a + c.modules.length, 0);

  // Calculate real GPA from profile
  let gpa = '—';
  let completedSemesters = 0;
  if (profile) {
    const results = generateResultsForStudent(profile.programId, profile.currentSemester);
    completedSemesters = results.length;
    if (results.length > 0) {
      const cgpa = results.reduce((s, r) => s + r.gpa, 0) / results.length;
      gpa = cgpa.toFixed(2);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {userName}</h1>
            <p className="text-blue-100 mt-1">
              {profile ? `${profile.departmentName} — ${profile.programName} — Sem ${profile.currentSemester}` : 'Access all your academic modules from the sidebar or browse below.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: 'Total Modules', value: String(totalModules) },
            { label: 'Categories', value: String(MODULE_CATEGORIES.length) },
            { label: 'Semesters Done', value: String(completedSemesters) },
            { label: 'CGPA', value: gpa },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-blue-100 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MODULE_CATEGORIES.map((cat, ci) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.05 }}
            className="group bg-white rounded-xl border border-slate-200 p-5 text-left hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}12`, color: cat.color }}>
                <cat.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-800">{cat.title}</h3>
                <p className="text-[11px] text-slate-400">{cat.modules.length} modules</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
            <div className="space-y-1.5">
              {cat.modules.slice(0, 3).map((mod) => (
                <div key={mod.slug} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate">{mod.title}</span>
                  {mod.badge && (
                    <span className="text-[9px] px-1.5 py-px rounded-full bg-slate-100 text-slate-500">{mod.badge}</span>
                  )}
                </div>
              ))}
              {cat.modules.length > 3 && (
                <p className="text-[11px] text-blue-500 font-medium">+{cat.modules.length - 3} more</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-slate-400">
          Built with dedication by{' '}
          <a href="https://musab-007.netlify.app" target="_blank" rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:text-blue-600 hover:underline transition-colors">
            Musab Dawood
          </a>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE DETAIL VIEW
   ═══════════════════════════════════════════════════════════════════════ */
function ModuleDetailView({ slug, onBack, profile }: { slug: string; onBack: () => void; profile: StudentProfile | null }) {
  const mod = findModule(slug);
  const cat = findCategoryForModule(slug);
  if (!mod || !cat) return <div className="p-8">Module not found</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-sm mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span style={{ color: cat.color }} className="font-medium">{cat.title}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-700 font-medium">{mod.title}</span>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}12`, color: cat.color }}>
          <mod.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">{mod.title}</h1>
          <p className="text-sm text-slate-500">{mod.description}</p>
        </div>
      </div>
      <div>{renderModuleView(slug, cat.color, profile)}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════════════════════ */
export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [showWelcome, setShowWelcome] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    if (!token) return;
    fetch('/api/profile', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
          setNeedsOnboarding(false);
        } else {
          setNeedsOnboarding(true);
        }
      })
      .catch(() => setNeedsOnboarding(true))
      .finally(() => setLoadingProfile(false));
  }, [token]);

  const toggleCategory = useCallback((id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleNavigate = useCallback((slug: string) => {
    if (slug === '__home__') {
      setActiveModule(null);
    } else {
      const cat = findCategoryForModule(slug);
      if (cat) setExpandedCats((prev) => new Set(prev).add(cat.id));
      setActiveModule(slug);
    }
  }, []);

  // Loading state
  if (loadingProfile) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // First-time profile setup
  if (needsOnboarding) {
    return <ProfileSetupModal onComplete={(p) => { setProfile(p); setNeedsOnboarding(false); }} />;
  }

  return (
    <div className="h-screen w-screen flex bg-[#f8fafc] text-slate-800 overflow-hidden">
      <AnimatePresence>
        {showWelcome && <WelcomeScreen userName={user?.name || 'Student'} onDismiss={() => setShowWelcome(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed md:relative z-40 h-full ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <Sidebar
          activeModule={activeModule}
          onNavigate={handleNavigate}
          expandedCategories={expandedCats}
          toggleCategory={toggleCategory}
          onLogout={onLogout}
          userName={user?.name || 'Student'}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[64px] border-b border-slate-200 bg-white flex items-center px-4 sm:px-6 gap-4 shrink-0">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="md:hidden flex items-center gap-2">
              <img src="/uet-logo.png" alt="UET" className="w-6 h-6 object-contain" />
              <span className="text-sm font-bold text-slate-700">UET LMS</span>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-[11px] text-slate-400">Welcome back,</p>
              <p className="text-sm font-semibold text-slate-700">{user?.name || 'Student'}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!activeModule ? (
              <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <HomeView onNavigate={handleNavigate} userName={user?.name || 'Student'} profile={profile} />
              </motion.div>
            ) : (
              <motion.div key={activeModule} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <ModuleDetailView slug={activeModule} onBack={() => setActiveModule(null)} profile={profile} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* AI Floating Button */}
      <motion.button
        onClick={() => setAiOpen(true)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 flex items-center justify-center transition-colors"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* AI Panel */}
      <AIPanel isOpen={aiOpen} onClose={() => setAiOpen(false)} profile={profile} />
    </div>
  );
}