import React, { useState } from 'react';
import {
  Calendar, BookOpen, Clock, CheckSquare, Award, Building2, XCircle,
  MessageSquareWarning, FileText, RotateCcw, Receipt, DollarSign, FilePlus,
  User, ClipboardCheck, Stethoscope, UserCheck, ArrowLeftRight,
  FileSearch, BarChart3, MessageSquare, Star, PenTool,
  Download, Upload, AlertCircle, CheckCircle2, Info, Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getCoursesForSemester, generateResultsForStudent, generateTimetableForSemester,
  DEPARTMENTS, ALL_PROGRAMS, CS_ELECTIVES, TIME_SLOTS,
  type StudentProfile,
} from '@/lib/curriculum';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-slate-200 p-5 ${className}`}>{children}</div>;
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}10`, color }}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </Card>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'pending' | 'completed' | 'overdue' | 'open' | 'closed' }) {
  const colors: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    closed: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return <Badge variant="outline" className={`text-[11px] ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE VIEWS
   ═══════════════════════════════════════════════════════════════════════ */

// ── Academic Calendar ──
function AcademicCalendarView() {
  const events = [
    { date: 'Jul 21', title: 'Spring Semester Begins', type: 'academic' },
    { date: 'Jul 28', title: 'Course Add/Drop Deadline', type: 'deadline' },
    { date: 'Aug 15', title: 'Independence Day Holiday', type: 'holiday' },
    { date: 'Aug 25', title: 'Mid-Term Exams Start', type: 'exam' },
    { date: 'Sep 05', title: 'Mid-Term Exams End', type: 'exam' },
    { date: 'Sep 15', title: 'Mid-Term Results', type: 'academic' },
    { date: 'Oct 10', title: 'Eid ul Fitr Holiday', type: 'holiday' },
    { date: 'Nov 01', title: 'Final Exams Start', type: 'exam' },
    { date: 'Nov 15', title: 'Final Exams End', type: 'exam' },
    { date: 'Dec 01', title: 'Fall Semester Begins', type: 'academic' },
  ];
  const typeColors: Record<string, string> = { academic: '#2563eb', deadline: '#d97706', holiday: '#059669', exam: '#dc2626' };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Events" value="10" icon={Calendar} color="#2563eb" />
        <StatCard label="Holidays" value="2" icon={Calendar} color="#059669" />
        <StatCard label="Exam Days" value="12" icon={Calendar} color="#dc2626" />
        <StatCard label="Semesters" value="2" icon={Calendar} color="#7c3aed" />
      </div>
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: typeColors[e.type] }} />
              <div className="w-16 text-sm font-semibold text-slate-700 shrink-0">{e.date}</div>
              <div className="flex-1 text-sm text-slate-600">{e.title}</div>
              <Badge variant="outline" className="text-[10px] capitalize" style={{ borderColor: `${typeColors[e.type]}30`, color: typeColors[e.type] }}>{e.type}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Offered Subjects (Dynamic) ──
function OfferedSubjectsView({ profile }: { profile: StudentProfile | null }) {
  const [search, setSearch] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState(profile?.programId || 'cs-bsc');
  const [selectedSemester, setSelectedSemester] = useState(profile?.currentSemester || 1);

  const program = ALL_PROGRAMS.find((p) => p.id === selectedProgramId);
  const totalSemesters = program?.totalSemesters || 8;
  const courses = getCoursesForSemester(selectedProgramId, selectedSemester);
  const filtered = courses.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));
  const totalCr = filtered.reduce((a, c) => a + c.theoryCredits + c.labCredits, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <select value={selectedProgramId} onChange={(e) => { setSelectedProgramId(e.target.value); setSelectedSemester(1); }}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
          {ALL_PROGRAMS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={String(selectedSemester)} onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400">
          {Array.from({ length: totalSemesters }, (_, i) => i + 1).map((s) => <option key={s} value={String(s)}>Semester {s}</option>)}
        </select>
        <Badge variant="outline">{filtered.length} subjects • {totalCr} credits</Badge>
      </div>
      <div className="relative flex-1 max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Search subjects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <Table headers={['Code', 'Subject Name', 'Credits', 'Type', 'Category']} rows={
        filtered.map((s) => [s.code, s.name, s.credits, s.labCredits > 0 ? 'Lab' : s.type === 'core' ? 'Core' : s.type === 'elective' ? 'Elective' : 'General', s.category || '—'])
      } />
    </div>
  );
}

// ── Department Timetable ──
function DeptTimetableView() {
  const slots = [
    ['08:30–09:50', 'CS-301 (L)', 'MTH-301 (L)', 'CS-302 (L)', 'CS-303 (L)', 'CS-304 (L)'],
    ['10:00–11:20', 'CS-301 (L)', 'ENG-301 (L)', 'MTH-302 (L)', 'CS-305 (L)', 'CS-302 (L)'],
    ['11:30–12:50', 'CS-302 (L)', 'CS-304 (L)', 'CS-301 (L)', 'MTH-301 (L)', 'Free'],
    ['01:00–02:00', 'CS-301 (Lab)', 'CS-302 (Lab)', 'MTH-301 (L)', 'CS-305 (L)', 'Free'],
    ['02:00–04:00', 'CS-302 (Lab)', 'CS-303 (Lab)', 'Free', 'CS-304 (Lab)', 'Free'],
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Department of Computer Science — Weekly Schedule</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="bg-slate-50">
            <th className="px-3 py-2 text-left text-slate-500 font-semibold">Time</th>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => <th key={d} className="px-3 py-2 text-center text-slate-500 font-semibold">{d}</th>)}
          </tr></thead>
          <tbody>
            {slots.map((row, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="px-3 py-2.5 font-medium text-slate-600">{row[0]}</td>
                {row.slice(1).map((cell, j) => (
                  <td key={j} className={`px-2 py-2 text-center rounded ${cell === 'Free' ? 'text-slate-400' : 'bg-blue-50/60 text-blue-700 font-medium'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── Student Timetable (Dynamic) ──
function StudentTimetableView({ profile }: { profile: StudentProfile | null }) {
  if (!profile) return <Card><p className="text-sm text-slate-400">Complete your profile first.</p></Card>;
  const slots = generateTimetableForSemester(profile.programId, profile.currentSemester);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const grid: (string | null)[][] = [];
  slots.forEach((s) => {
    const dayIdx = days.indexOf(s.day);
    if (dayIdx === -1) return;
    const timeIdx = TIME_SLOTS.indexOf(s.time);
    if (timeIdx !== -1) {
      if (!grid[timeIdx]) grid[timeIdx] = [];
      grid[timeIdx][dayIdx] = s.course;
      if (s.type === 'Lab') {
        if (!grid[timeIdx + 1]) grid[timeIdx + 1] = [];
        grid[timeIdx + 1][dayIdx] = s.course;
      }
    }
  });
  const program = ALL_PROGRAMS.find((p) => p.id === profile.programId);
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">{program?.shortName} — Timetable Sem {profile.currentSemester} ({profile.semesterType})</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-2 py-2 text-left text-slate-500 font-semibold">Time</th>
            {days.map((d) => <th key={d} className="px-2 py-2 text-center text-slate-500 font-semibold">{d}</th>)}
          </tr></thead>
          <tbody>
            {TIME_SLOTS.map((time, ti) => (
              <tr key={time} className="border-b border-slate-100">
                <td className="px-2 py-2 font-medium text-slate-600">{time}</td>
                {days.map((d, di) => {
                  const cell = grid[ti]?.[di] || grid[ti + 1]?.[di] || null;
                  return (
                    <td key={di} className={`px-1 py-2 text-center ${cell ? (cell.includes('Lab') ? 'bg-purple-50/70 text-purple-700 font-medium' : 'bg-blue-50/60 text-blue-700 font-medium') : 'text-slate-300'}`}>
                      {cell || '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── Course Selection ──
function CourseSelectionView({ profile }: { profile: StudentProfile | null }) {
  const courses = profile ? getCoursesForSemester(profile.programId, profile.currentSemester) : [];
  const [selected, setSelected] = useState<Set<string>>(new Set(courses.filter(c => c.type === 'core').map(c => c.code)));
  const toggle = (code: string) => {
    setSelected((prev) => { const n = new Set(prev); if (n.has(code)) n.delete(code); else n.add(code); return n; });
  };
  const totalCredits = courses.filter((c) => selected.has(c.code)).reduce((a, c) => a + c.theoryCredits + c.labCredits, 0);

  if (courses.length === 0) return <Card><p className="text-sm text-slate-400">Complete your profile first to see available courses.</p></Card>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Selected" value={String(selected.size)} icon={CheckSquare} color="#2563eb" />
        <StatCard label="Total Credits" value={String(totalCredits)} icon={BookOpen} color="#059669" />
        <StatCard label="Available" value={String(courses.length)} icon={BookOpen} color="#7c3aed" />
      </div>
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Available Courses for Current Semester</h3>
        <div className="space-y-2">
          {courses.map((c) => {
            const isSel = selected.has(c.code);
            return (
              <div key={c.code} onClick={() => toggle(c.code)}
                className={`flex items-center gap-4 p-3.5 rounded-lg border cursor-pointer transition-all ${isSel ? 'border-blue-300 bg-blue-50/60' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSel ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                  {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{c.code}</span>
                    <span className="text-sm text-slate-600">{c.name}</span>
                    {c.type === 'core' && <Badge variant="outline" className="text-[9px] text-red-600 border-red-200">Required</Badge>}
                    {c.type === 'elective' && <Badge variant="outline" className="text-[9px] text-blue-600 border-blue-200">Elective</Badge>}
                  </div>
                </div>
                <span className="text-sm text-slate-500 font-medium">{c.credits} cr</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => toast.success('Courses submitted!')} className="bg-blue-600 hover:bg-blue-700">
            Submit Selection ({totalCredits} credits)
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ── Set Elective Course ──
function ElectiveCourseView() {
  const [selected, setSelected] = useState('');
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Select Your Elective</h3>
        <p className="text-xs text-slate-500 mb-4">Choose one elective from the list below. You can change it before the deadline.</p>
        <div className="space-y-2">
          {CS_ELECTIVES.map((e) => (
            <div key={e.code} onClick={() => setSelected(e.code)}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${selected === e.code ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200 hover:border-slate-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === e.code ? 'border-blue-600' : 'border-slate-300'}`}>
                {selected === e.code && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{e.name}</p>
                <p className="text-xs text-slate-500">{e.code} — {e.credits} credits — {e.category}</p>
              </div>
              <Badge variant="outline" className="text-[11px]">Elective</Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button disabled={!selected} onClick={() => toast.success('Elective saved!')} className="bg-blue-600 hover:bg-blue-700">
            Save Elective
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ── Apply Convocation ──
function ApplyConvocationView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Convocation Application</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Full Name"><Input placeholder="Enter your full name" /></FormField>
        <FormField label="Roll Number"><Input placeholder="e.g. 2022-CS-001" /></FormField>
        <FormField label="Degree Program"><Input placeholder="e.g. BSc Computer Engineering" /></FormField>
        <FormField label="Session"><Input placeholder="e.g. 2022-2026" /></FormField>
        <FormField label="CGPA"><Input placeholder="e.g. 3.42" /></FormField>
        <FormField label="Contact Number"><Input placeholder="+92-XXX-XXXXXXX" /></FormField>
        <div className="sm:col-span-2"><FormField label="Mailing Address"><Input placeholder="Full address for degree dispatch" /></FormField></div>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('Application submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Application</Button></div>
    </Card>
  );
}

// ── Hostel Admission ──
function HostelAdmissionView() {
  const [pref, setPref] = useState('single');
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Hostel Admission Application</h3>
      <p className="text-xs text-slate-500 mb-4">Fill in your preferences. Admin will review and approve.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Preferred Hostel">
          <select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm">
            <option>Hostel 1 (Boys)</option><option>Hostel 2 (Boys)</option><option>Hostel 3 (Girls)</option>
          </select>
        </FormField>
        <FormField label="Room Preference">
          <div className="flex gap-3 mt-1">
            {[['single', 'Single'], ['double', 'Double'], ['triple', 'Triple']].map(([v, l]) => (
              <button key={v} onClick={() => setPref(v)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${pref === v ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>{l}</button>
            ))}
          </div>
        </FormField>
        <FormField label="Meal Plan"><select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"><option>Full Board</option><option>Half Board</option><option>No Meals</option></select></FormField>
        <FormField label="Emergency Contact"><Input placeholder="+92-XXX-XXXXXXX" /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('Application submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Application</Button></div>
    </Card>
  );
}

// ── Hostel Cancel ──
function HostelCancelView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Cancel Hostel Allotment</h3>
      <p className="text-xs text-slate-500 mb-4">This action will release your hostel seat. You may need to re-apply next semester.</p>
      <div className="space-y-4 max-w-lg">
        <FormField label="Current Hostel"><Input disabled value="Hostel 1 (Boys) — Room 204" /></FormField>
        <FormField label="Reason for Cancellation">
          <textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Explain your reason..." />
        </FormField>
      </div>
      <div className="mt-6"><Button variant="destructive" onClick={() => toast.success('Cancellation submitted!')}>Submit Cancellation Request</Button></div>
    </Card>
  );
}

// ── Hostel Complaint ──
function HostelComplaintView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Submit a Complaint</h3>
      <div className="space-y-4 max-w-lg">
        <FormField label="Category"><select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"><option>Maintenance Issue</option><option>Roommate Conflict</option><option>Food Quality</option><option>Security Concern</option><option>Other</option></select></FormField>
        <FormField label="Subject"><Input placeholder="Brief subject of your complaint" /></FormField>
        <FormField label="Description"><textarea className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Provide details..." /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('Complaint submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Complaint</Button></div>
      <Separator className="my-6" />
      <h3 className="text-sm font-semibold text-slate-800 mb-3">Previous Complaints</h3>
      <Table headers={['Date', 'Subject', 'Category', 'Status']} rows={[
        ['Jul 15, 2026', 'AC not working', 'Maintenance', 'Pending'],
        ['Jun 28, 2026', 'Water supply issue', 'Maintenance', 'Resolved'],
      ]} />
    </Card>
  );
}

// ── View DMC (Dynamic based on profile) ──
function ViewDMCView({ profile }: { profile: StudentProfile | null }) {
  const [selectedSem, setSelectedSem] = useState(-1); // -1 = show current semester

  if (!profile) return <Card><p className="text-sm text-slate-400">Complete your profile first to view DMC.</p></Card>;

  const program = ALL_PROGRAMS.find((p) => p.id === profile.programId);
  const results = generateResultsForStudent(profile.programId, profile.currentSemester);
  const currentCourses = getCoursesForSemester(profile.programId, profile.currentSemester);

  const suffix = ['st', 'nd', 'rd', 'th'];
  const ordinals = results.map((r) => `${r.semester}${suffix[Math.min(r.semester - 1, 3)]}`);

  const totalCgpa = results.length > 0 ? results.reduce((sum, r) => {
    const semCr = r.courses.reduce((s, cr) => { const p = cr.credits.split('+'); return s + cr.gpa * (parseFloat(p[0]) + parseFloat(p[1] || '0')); }, 0);
    const semTot = r.courses.reduce((s, cr) => { const p = cr.credits.split('+'); return s + parseFloat(p[0]) + parseFloat(p[1] || '0'); }, 0);
    return sum + (semTot > 0 ? semCr / semTot : 0);
  }, 0) / results.length : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-bold text-slate-800">Detailed Marks Certificate (DMC)</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setSelectedSem(-1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedSem === -1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
            Current Sem
          </button>
          {results.map((r, i) => (
            <button key={i} onClick={() => setSelectedSem(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${selectedSem === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              {ordinals[i]}
            </button>
          ))}
        </div>
      </div>

      {selectedSem === -1 ? (
        /* CURRENT SEMESTER SUBJECTS (not yet graded) */
        <Card className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">{program?.shortName || ''} — Current Semester {profile.currentSemester} ({profile.semesterType})</h3>
              <p className="text-xs text-slate-500">{program?.name} — {profile.rollNumber || 'N/A'}</p>
            </div>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">In Progress</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-emerald-50 border-b border-emerald-100">
                {['Code', 'Subject', 'Credits', 'Type', 'Category', 'Status'].map((h) => <th key={h} className="px-4 py-2.5 text-left text-xs font-bold text-emerald-800 uppercase">{h}</th>)}
              </tr></thead>
              <tbody>{currentCourses.map((c, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{c.code}</td>
                  <td className="px-4 py-2.5 text-slate-700 font-medium">{c.name}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">{c.credits}</td>
                  <td className="px-4 py-2.5 text-center text-xs text-slate-500">{c.type}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">{c.category || '—'}</td>
                  <td className="px-4 py-2.5"><Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 text-[10px]">Ongoing</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">Results will be available after exams</p>
            <p className="text-xs text-slate-500">{currentCourses.length} subjects • {currentCourses.reduce((a, c) => a + c.theoryCredits + c.labCredits, 0)} credits</p>
          </div>
        </Card>
      ) : (
        /* COMPLETED SEMESTER DMC */
        <>
          {(() => {
            const semResult = results[selectedSem] || results[results.length - 1];
            return (
              <Card className="max-w-3xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{program?.shortName || ''} — {semResult.semesterType.charAt(0).toUpperCase() + semResult.semesterType.slice(1)} {semResult.semester}</h3>
                    <p className="text-xs text-slate-500">{program?.name} — {profile?.rollNumber || 'N/A'}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info('DMC downloaded!')}>
                    <Download className="w-4 h-4 mr-1.5" /> PDF
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-blue-50 border-b border-blue-100">
                      {['Code', 'Subject', 'Type', 'Credits', 'Mid', 'Final', 'Total', 'Grade'].map((h) => <th key={h} className="px-4 py-2.5 text-left text-xs font-bold text-blue-800 uppercase">{h}</th>)}
                    </tr></thead>
                    <tbody>{semResult.courses.map((r: any, i: number) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{r.code}</td>
                        <td className="px-4 py-2.5 text-slate-700 font-medium">{r.name}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-500">{r.credits}</td>
                        <td className="px-4 py-2.5 text-center text-xs text-slate-500">{(() => { const p = r.credits.split('+'); return parseFloat(p[0]) + parseFloat(p[1] || '0'); })()}</td>
                        <td className="px-4 py-2.5 text-center text-slate-600">{r.mid}</td>
                        <td className="px-4 py-2.5 text-center text-slate-600">{r.final === 0 ? '—' : r.final}</td>
                        <td className="px-4 py-2.5 text-center font-bold text-slate-800">{r.total}</td>
                        <td className="px-4 py-2.5 text-center"><Badge variant="outline" className="font-bold text-blue-700 border-blue-200">{r.grade}</Badge></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-end gap-6 pt-3 border-t border-slate-100">
                  <div className="text-right"><p className="text-xs text-slate-500">Semester GPA</p><p className="text-2xl font-bold text-blue-600">{semResult.gpa.toFixed(2)}</p></div>
                  <div className="text-right"><p className="text-xs text-slate-500">Cumulative CGPA</p><p className="text-2xl font-bold text-blue-600">{totalCgpa.toFixed(2)}</p></div>
                </div>
              </Card>
            );
          })()}

          {/* GPA Trend */}
          {results.length > 1 && (
            <Card>
              <h4 className="text-sm font-semibold text-slate-800 mb-4">GPA Trend — All Completed Semesters</h4>
              <div className="flex items-end gap-3 h-32">
                {results.map((r, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400">{ordinals[i]}</span>
                    <div className="w-10 rounded-t-md bg-blue-500 transition-all" style={{ height: `${Math.max(r.gpa / 4 * 100, 8)}%` }} />
                    <span className="text-xs font-bold text-slate-700">{r.gpa.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

// ── Recheck Request ──
function RecheckRequestView() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Submit Recheck Request</h3>
        <div className="space-y-4 max-w-lg">
          <FormField label="Subject"><select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"><option>CS-301 — Data Structures & Algorithms</option><option>CS-302 — Database Management Systems</option><option>CS-303 — Operating Systems</option></select></FormField>
          <FormField label="Reason"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Why do you believe there is an error..." /></FormField>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">Recheck fee: Rs. 500 per subject. Fee must be deposited before processing.</p>
          </div>
        </div>
        <div className="mt-6"><Button onClick={() => toast.success('Recheck request submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Request</Button></div>
      </Card>
    </div>
  );
}

// ── Fee Challan ──
function FeeChallanView() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Total Due" value="Rs. 45,000" icon={Receipt} color="#dc2626" />
        <StatCard label="Paid" value="Rs. 90,000" icon={CheckCircle2} color="#059669" />
        <StatCard label="This Semester" value="Rs. 135,000" icon={DollarSign} color="#2563eb" />
      </div>
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Fee Challans</h3>
        <Table headers={['Challan #', 'Description', 'Amount', 'Due Date', 'Status']} rows={[
          ['CHL-2026-003', 'Tuition Fee — Fall 2026', 'Rs. 45,000', 'Aug 15, 2026', 'Overdue'],
          ['CHL-2026-002', 'Exam Fee — Spring 2026', 'Rs. 5,000', 'Jun 01, 2026', 'Paid'],
          ['CHL-2026-001', 'Tuition Fee — Spring 2026', 'Rs. 45,000', 'Feb 01, 2026', 'Paid'],
          ['CHL-2025-006', 'Library Fee', 'Rs. 2,000', 'Dec 01, 2025', 'Paid'],
        ]} />
      </Card>
    </div>
  );
}

// ── Fee Summary ──
function FeeSummaryView() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/50">
          <p className="text-xs text-emerald-600 font-medium">Total Paid</p>
          <p className="text-3xl font-bold text-emerald-700 mt-1">Rs. 92,000</p>
          <p className="text-xs text-emerald-500 mt-1">5 transactions</p>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <p className="text-xs text-amber-600 font-medium">Pending</p>
          <p className="text-3xl font-bold text-amber-700 mt-1">Rs. 45,000</p>
          <p className="text-xs text-amber-500 mt-1">Due: Aug 15, 2026</p>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <p className="text-xs text-red-600 font-medium">Overdue</p>
          <p className="text-3xl font-bold text-red-700 mt-1">Rs. 0</p>
          <p className="text-xs text-red-500 mt-1">All clear!</p>
        </Card>
      </div>
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Transactions</h3>
        <Table headers={['Date', 'Description', 'Amount', 'Method', 'Status']} rows={[
          ['Jun 01, 2026', 'Exam Fee — Spring 2026', 'Rs. 5,000', 'Bank Deposit', 'Paid'],
          ['Feb 01, 2026', 'Tuition Fee — Spring 2026', 'Rs. 45,000', 'Online Transfer', 'Paid'],
          ['Dec 01, 2025', 'Library Fee', 'Rs. 2,000', 'Bank Deposit', 'Paid'],
        ]} />
      </Card>
    </div>
  );
}

// ── Miscellaneous Challan ──
function MiscChallanView() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Miscellaneous Challans</h3>
        <Table headers={['Challan #', 'Description', 'Amount', 'Date', 'Status']} rows={[
          ['MISC-001', 'Transcript Fee', 'Rs. 500', 'Jul 10, 2026', 'Paid'],
          ['MISC-002', 'Degree Verification', 'Rs. 1,000', 'Jul 12, 2026', 'Pending'],
        ]} />
      </Card>
    </div>
  );
}

// ── Student Profile ──
function StudentProfileView() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="space-y-4">
      <Card className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-slate-800">Student Profile</h3>
          <Button variant="outline" size="sm" onClick={() => { setEditing(!editing); toast.success(editing ? 'Profile saved!' : 'Edit mode enabled'); }}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Full Name', 'Musab Dawood'],
            ['Roll Number', '2022-CS-042'],
            ['Email', 'musab.dawood@uet.edu.pk'],
            ['Department', 'Computer Science'],
            ['Degree', 'BSc Computer Engineering'],
            ['Semester', '4th'],
            ['Session', '2022-2026'],
            ['CGPA', '3.42'],
            ['Advisor', 'Dr. Ahmed Khan'],
            ['Phone', '+92-321-XXXXXXX'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">{label}</p>
              {editing && label !== 'Roll Number' && label !== 'CGPA' && label !== 'Semester' ? (
                <Input defaultValue={value} className="mt-1 h-8 text-sm" />
              ) : (
                <p className="text-sm font-medium text-slate-800 mt-0.5">{value}</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Student Clearance ──
function StudentClearanceView() {
  const depts = [
    { name: 'Library', status: 'completed', note: 'No dues' },
    { name: 'Computer Lab', status: 'completed', note: 'Equipment returned' },
    { name: 'Hostel', status: 'pending', note: 'Room inspection pending' },
    { name: 'Sports', status: 'completed', note: 'Clear' },
    { name: 'Accounts', status: 'pending', note: 'Fee verification pending' },
    { name: 'Department', status: 'active', note: 'In progress' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Student Clearance</h3>
      <p className="text-xs text-slate-500 mb-4">All departments must clear you before graduation.</p>
      <div className="space-y-2">
        {depts.map((d) => (
          <div key={d.name} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              d.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
              d.status === 'active' ? 'bg-blue-100 text-blue-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              {d.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{d.name}</p>
              <p className="text-xs text-slate-500">{d.note}</p>
            </div>
            <StatusBadge status={d.status as 'completed' | 'pending' | 'active'} />
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── PEC Registration ──
function PECRegistrationView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">PEC Registration Form</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Full Name"><Input placeholder="As per degree" /></FormField>
        <FormField label="Father's Name"><Input placeholder="Father's full name" /></FormField>
        <FormField label="CNIC Number"><Input placeholder="XXXXX-XXXXXXX-X" /></FormField>
        <FormField label="PEC Registration No."><Input placeholder="If already registered" /></FormField>
        <FormField label="Degree Title"><Input defaultValue="BSc Computer Engineering" /></FormField>
        <FormField label="Passing Year"><Input placeholder="Expected graduation year" /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('PEC registration submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Registration</Button></div>
    </Card>
  );
}

// ── Student Mentoring ──
function StudentMentoringView() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Your Mentor</h3>
        <p className="text-xs text-slate-500 mb-4">Assigned faculty mentor for academic guidance.</p>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">AK</div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Dr. Ahmed Khan</p>
            <p className="text-xs text-slate-500">Department of Computer Science</p>
            <p className="text-xs text-blue-600">ahmed.khan@uet.edu.pk</p>
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Mentoring Sessions</h3>
        <Table headers={['Date', 'Topic', 'Type', 'Status']} rows={[
          ['Jul 10, 2026', 'Semester Progress Review', 'In-Person', 'Completed'],
          ['Jun 15, 2026', 'Career Guidance Discussion', 'Online', 'Completed'],
          ['May 20, 2026', 'Course Selection Advice', 'In-Person', 'Completed'],
        ]} />
      </Card>
    </div>
  );
}

// ── Re-Admission ──
function ReadmissionView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Re-Admission Request</h3>
      <p className="text-xs text-slate-500 mb-4">For students who have dropped out and wish to re-enroll.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Original Roll Number"><Input placeholder="e.g. 2022-CS-042" /></FormField>
        <FormField label="Last Semester Attended"><Input placeholder="e.g. Spring 2025" /></FormField>
        <FormField label="Reason for Drop-out"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Explain..." /></FormField>
        <FormField label="Reason for Re-Admission"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Why do you want to rejoin..." /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('Re-admission request submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Request</Button></div>
    </Card>
  );
}

// ── Thesis Track ──
function ThesisTrackView() {
  const milestones = [
    { title: 'Topic Approval', status: 'completed', date: 'Mar 2026' },
    { title: 'Proposal Submission', status: 'completed', date: 'Apr 2026' },
    { title: 'Proposal Defense', status: 'completed', date: 'May 2026' },
    { title: 'Literature Review', status: 'active', date: 'In Progress' },
    { title: 'Implementation', status: 'pending', date: '—' },
    { title: 'Final Defense', status: 'pending', date: '—' },
  ];
  return (
    <div className="space-y-4">
      <Card className="max-w-2xl">
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Thesis Progress</h3>
        <p className="text-xs text-slate-500 mb-2">Title: <span className="font-medium text-slate-700">AI-Based Student Performance Prediction in LMS</span></p>
        <p className="text-xs text-slate-500 mb-6">Supervisor: <span className="font-medium text-slate-700">Dr. Ahmed Khan</span></p>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                  m.status === 'active' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-100 text-slate-400'
                }`}>
                  {m.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                {i < milestones.length - 1 && <div className={`w-0.5 h-10 ${m.status === 'completed' ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
              </div>
              <div className="pb-6">
                <p className="text-sm font-medium text-slate-800">{m.title}</p>
                <p className="text-xs text-slate-500">{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Reports ──
function ReportsView() {
  const reports = [
    { name: 'Semester Grade Report', type: 'Academic', date: 'Jul 2026' },
    { name: 'Attendance Summary', type: 'Academic', date: 'Jul 2026' },
    { name: 'Fee Payment History', type: 'Finance', date: 'Jul 2026' },
    { name: 'Transcript (Unofficial)', type: 'Academic', date: 'Jul 2026' },
    { name: 'Course Registration Summary', type: 'Academic', date: 'Feb 2026' },
    { name: 'Hostel Allotment Letter', type: 'Hostel', date: 'Aug 2025' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Available Reports</h3>
      <div className="space-y-2">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <FileText className="w-5 h-5 text-slate-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-500">{r.type} — {r.date}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toast.info('Downloading report...')}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Apply Scholarship ──
function ApplyScholarshipView() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Scholarship Application</h3>
        <p className="text-xs text-slate-500 mb-4">Apply for merit-based or need-based scholarships.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <FormField label="Scholarship Type"><select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"><option>Merit-Based</option><option>Need-Based</option><option>Special Talent</option></select></FormField>
          <FormField label="Current CGPA"><Input placeholder="e.g. 3.42" /></FormField>
          <FormField label="Father's Income (Monthly)"><Input placeholder="Rs." /></FormField>
          <FormField label="Family Members"><Input placeholder="Number of dependents" /></FormField>
          <div className="sm:col-span-2"><FormField label="Justification"><textarea className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="Why do you deserve this scholarship..." /></FormField></div>
          <div className="sm:col-span-2"><FormField label="Upload Supporting Documents"><Input type="file" className="text-sm" /></FormField></div>
        </div>
        <div className="mt-6"><Button onClick={() => toast.success('Scholarship application submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Application</Button></div>
      </Card>
    </div>
  );
}

// ── Course Survey ──
function SurveySubjectsView() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const set = (code: string, val: number) => setRatings((p) => ({ ...p, [code]: val }));
  const subjects = ['CS-301 — Data Structures', 'CS-302 — Databases', 'CS-303 — Operating Systems'];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Course Feedback Survey</h3>
      <p className="text-xs text-slate-500 mb-4">Rate each course from 1 (Poor) to 5 (Excellent).</p>
      <div className="space-y-4">
        {subjects.map((s) => (
          <div key={s} className="p-4 rounded-lg border border-slate-200">
            <p className="text-sm font-medium text-slate-800 mb-3">{s}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} onClick={() => set(s, v)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold border-2 transition-all ${ratings[s] === v ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>{v}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6"><Button disabled={Object.keys(ratings).length < 3} onClick={() => toast.success('Survey submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Survey</Button></div>
    </Card>
  );
}

// ── Exit Survey ──
function ExitSurveyView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Exit Survey</h3>
      <p className="text-xs text-slate-500 mb-4">Share your overall experience at UET Lahore.</p>
      <div className="space-y-4 max-w-2xl">
        <FormField label="How would you rate your overall experience?">
          <div className="flex gap-2 mt-1">{[1,2,3,4,5].map((v) => (<button key={v} className="w-10 h-10 rounded-lg text-sm font-bold border-2 border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50">{v}</button>))}</div>
        </FormField>
        <FormField label="What did you like most about the program?"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="..." /></FormField>
        <FormField label="Suggestions for improvement"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="..." /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('Exit survey submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Survey</Button></div>
    </Card>
  );
}

// ── University Survey ──
function UniversitySurveyView() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">University Survey</h3>
      <p className="text-xs text-slate-500 mb-4">General feedback about UET Lahore facilities and services.</p>
      <div className="space-y-4 max-w-2xl">
        {['Lab Facilities', 'Library Resources', 'Sports & Recreation', 'Campus Security', 'Cafeteria Quality'].map((q) => (
          <FormField key={q} label={`Rate: ${q}`}>
            <div className="flex gap-2 mt-1">{[1,2,3,4,5].map((v) => (<button key={v} className="w-8 h-8 rounded text-xs font-bold border border-slate-200 text-slate-500 hover:border-blue-300">{v}</button>))}</div>
          </FormField>
        ))}
        <FormField label="Additional Comments"><textarea className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm resize-none" placeholder="..." /></FormField>
      </div>
      <div className="mt-6"><Button onClick={() => toast.success('University survey submitted!')} className="bg-blue-600 hover:bg-blue-700">Submit Survey</Button></div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ROUTER
   ═══════════════════════════════════════════════════════════════════════ */
const MODULE_VIEW_MAP: Record<string, React.ComponentType<{ profile: StudentProfile | null }>> = {
  'academic-calendar': AcademicCalendarView as any,
  'offered-subjects': OfferedSubjectsView,
  'dept-timetable': DeptTimetableView as any,
  'student-timetable': StudentTimetableView,
  'course-selection': CourseSelectionView,
  'elective-course': ElectiveCourseView as any,
  'apply-convocation': ApplyConvocationView as any,
  'hostel-admission': HostelAdmissionView as any,
  'hostel-cancel': HostelCancelView as any,
  'hostel-complaint': HostelComplaintView as any,
  'view-dmc': ViewDMCView,
  'recheck-request': RecheckRequestView as any,
  'fee-challan': FeeChallanView as any,
  'fee-summary': FeeSummaryView as any,
  'misc-challan': MiscChallanView as any,
  'student-profile': StudentProfileView as any,
  'student-clearance': StudentClearanceView as any,
  'pec-registration': PECRegistrationView as any,
  'student-mentoring': StudentMentoringView as any,
  'readmission': ReadmissionView as any,
  'thesis-track': ThesisTrackView as any,
  'reports': ReportsView as any,
  'apply-scholarship': ApplyScholarshipView as any,
  'survey-subjects': SurveySubjectsView as any,
  'exit-survey': ExitSurveyView as any,
  'university-survey': UniversitySurveyView as any,
};

export function renderModuleView(slug: string, color: string, profile: StudentProfile | null): React.ReactNode {
  const View = MODULE_VIEW_MAP[slug];
  if (!View) return <Card><p className="text-sm text-slate-500">This module is under development. Check back soon.</p></Card>;
  return <View profile={profile} />;
}