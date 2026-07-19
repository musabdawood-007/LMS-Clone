'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, GraduationCap, CheckCircle2, Building2, BookOpen } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { DEPARTMENTS, ALL_PROGRAMS, type DegreeProgram } from '@/lib/curriculum';

interface OnboardingData {
  departmentId: string;
  departmentName: string;
  programId: string;
  programName: string;
  currentSemester: number;
  semesterType: 'spring' | 'fall';
  rollNumber: string;
}

const STEPS = ['Department', 'Degree Program', 'Semester', 'Confirm'];

export default function OnboardingScreen({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    departmentId: '', departmentName: '', programId: '', programName: '',
    currentSemester: 1, semesterType: 'fall', rollNumber: '',
  });
  const [saving, setSaving] = useState(false);
  const [filteredPrograms, setFilteredPrograms] = useState<DegreeProgram[]>([]);

  const dept = DEPARTMENTS.find((d) => d.id === data.departmentId);

  useEffect(() => {
    if (data.departmentId) {
      const progs = ALL_PROGRAMS.filter((p) => p.departmentId === data.departmentId);
      setFilteredPrograms(progs);
      if (progs.length > 0 && !progs.find((p) => p.id === data.programId)) {
        setData((prev) => ({ ...prev, programId: progs[0].id, programName: progs[0].name }));
      }
    }
  }, [data.departmentId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) { toast.error(result.error || 'Failed to save'); return; }
      toast.success('Profile saved successfully!');
      onComplete(data);
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600/10 flex items-center justify-center">
            <img src="/uet-logo.png" alt="UET" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Complete Your Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome, <span className="font-medium text-blue-600">{user?.name}</span>. Tell us about your academic details.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step ? 'bg-blue-600 text-white' : i === step ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
              {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="dept" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Building2 className="w-5 h-5 text-blue-600" /></div>
                  <div><h2 className="text-lg font-semibold text-slate-800">Select Department</h2><p className="text-xs text-slate-500">Choose your department at UET Lahore</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                  {DEPARTMENTS.map((d) => (
                    <button key={d.id} onClick={() => setData((p) => ({ ...p, departmentId: d.id, departmentName: d.name }))}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        data.departmentId === d.id ? 'border-blue-500 bg-blue-50/60' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        data.departmentId === d.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>{d.id.slice(0, 2).toUpperCase()}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{d.name}</p>
                        <p className="text-[11px] text-slate-400">{d.campus} Campus — {d.degrees.length} programs</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button disabled={!data.departmentId} onClick={() => setStep(1)} className="bg-blue-600 hover:bg-blue-700">
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="prog" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><BookOpen className="w-5 h-5 text-blue-600" /></div>
                  <div><h2 className="text-lg font-semibold text-slate-800">Select Degree Program</h2><p className="text-xs text-slate-500">{dept?.name} — {filteredPrograms.length} programs available</p></div>
                </div>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {filteredPrograms.map((p) => (
                    <button key={p.id} onClick={() => setData((prev) => ({ ...prev, programId: p.id, programName: p.name }))}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        data.programId === p.id ? 'border-blue-500 bg-blue-50/60' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.programId === p.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {data.programId === p.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{p.name}</p>
                        <p className="text-[11px] text-slate-400">{p.totalSemesters} semesters</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(0)}><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                  <Button disabled={!data.programId} onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700">
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="sem" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><GraduationCap className="w-5 h-5 text-blue-600" /></div>
                  <div><h2 className="text-lg font-semibold text-slate-800">Academic Details</h2><p className="text-xs text-slate-500">{data.programName}</p></div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-slate-700">Roll Number</Label>
                    <Input placeholder="e.g. 2022-CS-042" value={data.rollNumber}
                      onChange={(e) => setData((p) => ({ ...p, rollNumber: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-slate-700">Current Semester</Label>
                    <div className="flex gap-2 flex-wrap">
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
                        <button key={s} onClick={() => setData((p) => ({ ...p, currentSemester: s }))}
                          className={`w-12 h-10 rounded-lg text-sm font-bold border-2 transition-all ${
                            data.currentSemester === s ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}>{s}</button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {data.currentSemester > 1
                        ? `Semesters 1 to ${data.currentSemester - 1} will have auto-generated results.`
                        : 'First semester — no past results.'}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-slate-700">Current Semester Type</Label>
                    <div className="flex gap-3">
                      {(['fall', 'spring'] as const).map((t) => (
                        <button key={t} onClick={() => setData((p) => ({ ...p, semesterType: t }))}
                          className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
                            data.semesterType === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                  <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">
                    Review <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Review & Confirm</h2>
                  <p className="text-xs text-slate-500">Please verify your academic details</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                  {[
                    ['Department', data.departmentName],
                    ['Degree Program', data.programName],
                    ['Roll Number', data.rollNumber || '—'],
                    ['Current Semester', `${data.currentSemester}${data.currentSemester === 1 ? 'st' : data.currentSemester === 2 ? 'nd' : data.currentSemester === 3 ? 'rd' : 'th'} (${data.semesterType.charAt(0).toUpperCase() + data.semesterType.slice(1)})`],
                    ['Completed Semesters', data.currentSemester > 1 ? `1–${data.currentSemester - 1} (${data.currentSemester - 1} semesters with results)` : 'None (1st semester)'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{label}</span>
                      <span className="text-sm font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
                {data.currentSemester > 1 && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Note:</strong> Results for semesters 1–{data.currentSemester - 1} will be auto-generated based on UET&apos;s official course plan. You can view your DMC in the Results module.
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                    {saving ? 'Saving...' : 'Complete Setup'} <CheckCircle2 className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-6 text-[11px] text-slate-400">
            Built by{' '}
            <a href="https://musab-007.netlify.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600">
              Musab Dawood
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}