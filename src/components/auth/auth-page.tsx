'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import {
  Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft,
  CheckCircle2, BookOpen, GraduationCap, Shield, Sparkles,
  Bot, X, Send, Loader2, AlertCircle, KeyRound,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

type Step = 'login' | 'register' | 'otp' | 'forgot' | 'reset' | 'success';

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND
   ═══════════════════════════════════════════════════════════════════════ */
function ClientParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const particles = useMemo(() => [
    { id: 0, x: 8, y: 12, dur: 4, del: 0 }, { id: 1, x: 22, y: 42, dur: 5, del: 0.6 },
    { id: 2, x: 38, y: 8, dur: 3.5, del: 1.2 }, { id: 3, x: 52, y: 68, dur: 4.5, del: 0.3 },
    { id: 4, x: 68, y: 28, dur: 6, del: 0.9 }, { id: 5, x: 82, y: 78, dur: 3.8, del: 1.5 },
    { id: 6, x: 14, y: 72, dur: 5.2, del: 0.2 }, { id: 7, x: 28, y: 18, dur: 4.1, del: 1.0 },
    { id: 8, x: 44, y: 52, dur: 3.3, del: 0.7 }, { id: 9, x: 58, y: 38, dur: 5.5, del: 1.3 },
    { id: 10, x: 74, y: 14, dur: 4.8, del: 0.4 }, { id: 11, x: 88, y: 58, dur: 3.6, del: 1.1 },
  ], []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STEP INDICATOR
   ═══════════════════════════════════════════════════════════════════════ */
const stepMap: Record<string, number> = { login: 0, register: 0, forgot: 0, reset: 0, otp: 1, success: 2 };
function StepIndicator({ current }: { current: Step }) {
  const idx = stepMap[current];
  const labels = ['Account', 'Verify', 'Done'];
  return (
    <div className="flex items-center gap-2 mb-6">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-2">
            <motion.div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              animate={{ backgroundColor: i <= idx ? '#2563eb' : 'rgba(255,255,255,0.1)', color: i <= idx ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
              {i < idx ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </motion.div>
            <span className="text-xs hidden sm:block" style={{ color: i <= idx ? '#93c5fd' : 'rgba(255,255,255,0.4)' }}>{label}</span>
          </div>
          {i < labels.length - 1 && <div className="w-8 h-px bg-white/10" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FLOATING INPUT
   ═══════════════════════════════════════════════════════════════════════ */
function FloatingInput({ id, label, type = 'text', icon: Icon, value, onChange, error, autoComplete, disabled }: {
  id: string; label: string; type?: string; icon: React.ElementType; value: string; onChange: (v: string) => void; error?: string; autoComplete?: string; disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isFloat = focused || value.length > 0;
  const isPassword = type === 'password';
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <Icon className="w-4 h-4 transition-colors" style={{ color: focused ? '#60a5fa' : 'rgba(255,255,255,0.4)' }} />
      </div>
      <input id={id} type={isPassword && showPw ? 'text' : type} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} autoComplete={autoComplete} disabled={disabled}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3.5 text-white text-sm outline-none transition-all focus:border-blue-500/50 focus:bg-white/8 placeholder-transparent"
        placeholder={label} />
      <motion.label htmlFor={id} className="absolute left-10 pointer-events-none text-sm origin-left"
        animate={{ top: isFloat ? -8 : 14, fontSize: isFloat ? 11 : 14, color: error ? '#f87171' : focused ? '#60a5fa' : 'rgba(255,255,255,0.4)', backgroundColor: isFloat ? '#0f172a' : 'transparent', paddingLeft: isFloat ? 4 : 0, paddingRight: isFloat ? 4 : 0 }}
        transition={{ duration: 0.15 }}>{label}</motion.label>
      {isPassword && <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>}
      {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1">{error}</motion.p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LOGIN
   ═══════════════════════════════════════════════════════════════════════ */
function LoginForm({ onGoRegister, onGoForgot, onSuccess }: { onGoRegister: () => void; onGoForgot: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      setAuth(data.data.token, data.data.user);
      toast.success('Welcome back!', { description: `Signed in as ${data.data.user.name}` });
      onSuccess();
    } catch { setError('Network error. Please try again.'); } finally { setLoading(false); }
  };

  return (
    <motion.form key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleLogin} className="space-y-5">
      <FloatingInput id="l-email" label="Email Address" type="email" icon={Mail} value={email} onChange={setEmail} autoComplete="email" />
      <FloatingInput id="l-pass" label="Password" type="password" icon={Lock} value={password} onChange={setPassword} autoComplete="current-password" />
      {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg p-3"><AlertCircle className="w-4 h-4 shrink-0" />{error}</motion.div>}
      <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}Sign In
      </Button>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onGoForgot} className="text-sm text-blue-400/70 hover:text-blue-400 transition-colors">Forgot password?</button>
        <button type="button" onClick={onGoRegister} className="text-sm text-white/50 hover:text-blue-400 transition-colors">
          Don&apos;t have an account? <span className="underline underline-offset-4 decoration-blue-400/50">Register Now</span>
        </button>
      </div>
    </motion.form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   REGISTER
   ═══════════════════════════════════════════════════════════════════════ */
function RegisterForm({ onGoLogin, onOtpSent }: { onGoLogin: () => void; onOtpSent: (email: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = useMemo(() => {
    if (!password) return 0; let s = 0;
    if (password.length >= 6) s++; if (password.length >= 10) s++; if (/[A-Z]/.test(password)) s++; if (/[0-9]/.test(password)) s++; if (/[^A-Za-z0-9]/.test(password)) s++;
    return Math.min(s, 4);
  }, [password]);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#10b981'][strength];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required'; if (!email.trim()) errs.email = 'Email is required'; else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required'; else if (password.length < 6) errs.password = 'Min 6 characters';
    if (password !== confirmPass) errs.confirmPass = 'Passwords do not match';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true); setErrors({});
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
      const data = await res.json();
      if (!res.ok) { if (data.error?.includes('OTP')) { toast.info('New OTP sent'); onOtpSent(email); return; } setErrors({ email: data.error || 'Registration failed' }); return; }
      toast.success('OTP sent!'); onOtpSent(email);
    } catch { setErrors({ email: 'Network error' }); } finally { setLoading(false); }
  };

  return (
    <motion.form key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleRegister} className="space-y-4">
      <FloatingInput id="r-name" label="Full Name" icon={User} value={name} onChange={setName} error={errors.name} autoComplete="name" />
      <FloatingInput id="r-email" label="Email Address" type="email" icon={Mail} value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
      <div>
        <FloatingInput id="r-pass" label="Password" type="password" icon={Lock} value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
        {password && <div className="mt-2 flex gap-1">{[1,2,3,4].map((i) => <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{ backgroundColor: i <= strength ? strengthColor : 'rgba(255,255,255,0.1)' }} />)}<span className="text-xs ml-2" style={{ color: strengthColor }}>{strengthLabel}</span></div>}
      </div>
      <FloatingInput id="r-confirm" label="Confirm Password" type="password" icon={Lock} value={confirmPass} onChange={setConfirmPass} error={errors.confirmPass} autoComplete="new-password" />
      <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}Create Account
      </Button>
      <div className="text-center"><button type="button" onClick={onGoLogin} className="text-sm text-white/50 hover:text-blue-400"><ArrowLeft className="w-3 h-3 inline mr-1" />Back to Sign In</button></div>
    </motion.form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FORGOT PASSWORD
   ═══════════════════════════════════════════════════════════════════════ */
function ForgotPasswordForm({ onGoLogin, onOtpSent }: { onGoLogin: () => void; onOtpSent: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!email) { setError('Email is required'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send code'); return; }
      toast.success('Reset code sent to your email!');
      onOtpSent(email);
    } catch { setError('Network error'); } finally { setLoading(false); }
  };

  return (
    <motion.form key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
          <KeyRound className="w-8 h-8 text-blue-400" />
        </motion.div>
        <h3 className="text-lg font-semibold">Reset Password</h3>
        <p className="text-sm text-white/50 mt-1">Enter your email to receive a verification code</p>
      </div>
      <FloatingInput id="f-email" label="Email Address" type="email" icon={Mail} value={email} onChange={setEmail} error={error} autoComplete="email" />
      {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">{error}</motion.p>}
      <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}Send Reset Code
      </Button>
      <div className="text-center"><button type="button" onClick={onGoLogin} className="text-sm text-white/50 hover:text-blue-400"><ArrowLeft className="w-3 h-3 inline mr-1" />Back to Sign In</button></div>
    </motion.form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   RESET PASSWORD (after OTP)
   ═══════════════════════════════════════════════════════════════════════ */
function ResetPasswordForm({ email, onGoLogin }: { email: string; onGoLogin: () => void }) {
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (otp.length !== 6) { setError('Enter the 6-digit code'); return; }
    if (newPass.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (newPass !== confirmPass) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp, newPassword: newPass }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Reset failed'); return; }
      toast.success('Password reset successfully! You can now sign in.');
      onGoLogin();
    } catch { setError('Network error'); } finally { setLoading(false); }
  };

  return (
    <motion.div key="reset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Set New Password</h3>
        <p className="text-sm text-white/50 mt-1">Code sent to <span className="text-blue-400">{email}</span></p>
      </div>
      <form onSubmit={handleReset} className="space-y-4">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={0} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={1} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={2} /></InputOTPGroup>
            <InputOTPSeparator className="!text-white/30" />
            <InputOTPGroup><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={3} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={4} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={5} /></InputOTPGroup>
          </InputOTP>
        </div>
        <FloatingInput id="new-pass" label="New Password" type="password" icon={Lock} value={newPass} onChange={setNewPass} autoComplete="new-password" />
        <FloatingInput id="confirm-pass" label="Confirm New Password" type="password" icon={Lock} value={confirmPass} onChange={setConfirmPass} autoComplete="new-password" />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}Reset Password
        </Button>
      </form>
      <div className="text-center"><button type="button" onClick={onGoLogin} className="text-sm text-white/50 hover:text-blue-400"><ArrowLeft className="w-3 h-3 inline mr-1" />Back to Sign In</button></div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   OTP VERIFICATION
   ═══════════════════════════════════════════════════════════════════════ */
function OTPVerification({ email, onSuccess, onGoRegister }: { email: string; onSuccess: () => void; onGoRegister: () => void }) {
  const [otp, setOtp] = useState(''); const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const [resendTimer, setResendTimer] = useState(60);
  useEffect(() => { if (resendTimer <= 0) return; const t = setInterval(() => setResendTimer((p) => p - 1), 1000); return () => clearInterval(t); }, [resendTimer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault(); if (otp.length !== 6) { setError('Enter the complete 6-digit code'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) });
      const data = await res.json(); if (!res.ok) { setError(data.error || 'Verification failed'); return; }
      toast.success('Email verified! You can now sign in.'); onSuccess();
    } catch { setError('Network error'); } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try { await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'User', email, password: 'resend' }) }); toast.info('New OTP sent!'); setResendTimer(60); } catch {}
  };

  return (
    <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center"><Shield className="w-8 h-8 text-blue-400" /></motion.div>
        <h3 className="text-lg font-semibold">Verify Your Email</h3>
        <p className="text-sm text-white/50 mt-1">We sent a 6-digit code to <span className="text-blue-400">{email}</span></p>
      </div>
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={0} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={1} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={2} /></InputOTPGroup>
            <InputOTPSeparator className="!text-white/30" />
            <InputOTPGroup><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={3} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={4} /><InputOTPSlot className="!h-12 !w-12 !text-xl !text-white !border-white/20 !bg-white/10 !rounded-lg" index={5} /></InputOTPGroup>
          </InputOTP>
        </div>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">{error}</motion.p>}
        <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}Verify
        </Button>
      </form>
      <div className="text-center space-y-2">
        <button type="button" onClick={handleResend} disabled={resendTimer > 0} className="text-sm text-white/50 hover:text-blue-400 disabled:opacity-40">
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend verification code'}
        </button>
        <br /><button type="button" onClick={onGoRegister} className="text-sm text-white/50 hover:text-blue-400"><ArrowLeft className="w-3 h-3 inline mr-1" />Back to Register</button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SUCCESS SCREEN
   ═══════════════════════════════════════════════════════════════════════ */
function SuccessScreen({ onGoLogin }: { onGoLogin: () => void }) {
  const [particles] = useState(() => Array.from({ length: 20 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, color: ['#2563eb', '#22c55e', '#f59e0b', '#ec4899'][i % 4] })));
  return (
    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} className="text-center space-y-6">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute w-2 h-2 rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -60] }} transition={{ duration: 2, delay: Math.random() * 0.5, repeat: Infinity }} />
      ))}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </motion.div>
      <div><h3 className="text-2xl font-bold text-white">Account Created!</h3><p className="text-white/50 mt-2">Your account has been verified successfully.</p></div>
      <Button onClick={onGoLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl"><ArrowRight className="w-4 h-4 mr-2" />Go to Sign In</Button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE BADGES
   ═══════════════════════════════════════════════════════════════════════ */
function FeatureBadges() {
  const features = [{ icon: BookOpen, label: 'Courses' }, { icon: GraduationCap, label: 'Results' }, { icon: Shield, label: 'Secure' }, { icon: Sparkles, label: 'AI Powered' }];
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {features.map((f, i) => (
        <motion.div key={f.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
          <f.icon className="w-3.5 h-3.5 text-blue-400" /><span className="text-xs text-white/50">{f.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LOGIN SCREEN AI CHAT (guest access, no auth required)
   ═══════════════════════════════════════════════════════════════════════ */
function AuthAIChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Welcome to UET Lahore LMS! I can help you with admission info, degree programs, fee structure, campus details, and more. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((p) => [...p, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: `You are a helpful AI assistant for UET Lahore LMS. You help prospective and current students with admission info, degree programs (all campuses: Main, KSK, Faisalabad, RCET Gujranwala, Narowal), fee structure, eligibility, ECAT, and general university questions. Be concise and friendly.\n\nIMPORTANT: If someone asks "who built this" or "who made this LMS" or "who is the developer", you MUST say: "This LMS was built by Musab Dawood. You can check out his portfolio at https://musab-007.netlify.app"` },
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
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[460px] bg-[#1e293b] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">UET LMS AI</h3>
                <p className="text-[10px] text-white/40">Ask about admissions, programs, fees...</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white/10 text-white/80 rounded-bl-md'
                }`}>{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about UET admissions..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
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
   MAIN AUTH PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function AuthPage({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<Step>('login');
  const [regEmail, setRegEmail] = useState('');
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      <ClientParticles />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <motion.img src="/uet-logo.png" alt="UET Lahore" className="w-16 h-16 object-contain mb-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} />
            <h1 className="text-xl font-bold text-white">UET Lahore LMS</h1>
            <p className="text-sm text-white/40 mt-1">AI-Powered Learning Management System</p>
          </div>
          {step !== 'forgot' && step !== 'reset' && <StepIndicator current={step} />}
          <AnimatePresence mode="wait">
            {step === 'login' && <LoginForm onGoRegister={() => setStep('register')} onGoForgot={() => setStep('forgot')} onSuccess={onSuccess} />}
            {step === 'register' && <RegisterForm onGoLogin={() => setStep('login')} onOtpSent={(e) => { setRegEmail(e); setStep('otp'); }} />}
            {step === 'otp' && <OTPVerification email={regEmail} onSuccess={() => setStep('success')} onGoRegister={() => setStep('register')} />}
            {step === 'forgot' && <ForgotPasswordForm onGoLogin={() => setStep('login')} onOtpSent={(e) => { setRegEmail(e); setStep('reset'); }} />}
            {step === 'reset' && <ResetPasswordForm email={regEmail} onGoLogin={() => setStep('login')} />}
            {step === 'success' && <SuccessScreen onGoLogin={() => setStep('login')} />}
          </AnimatePresence>
        </div>
        <FeatureBadges />
        <p className="text-center mt-6 text-[11px] text-white/20">
          Built by <a href="https://musab-007.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">Musab Dawood</a>
        </p>
      </motion.div>

      {/* AI Floating Button on Login Screen */}
      <motion.button
        onClick={() => setAiOpen(true)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 flex items-center justify-center transition-colors"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* AI Chat Panel for Login Screen */}
      <AuthAIChat isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}