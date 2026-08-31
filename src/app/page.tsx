'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import AuthPage from '@/components/auth/auth-page';
import Dashboard from '@/components/dashboard/dashboard';
import WelcomeScreen, { WELCOME_ACK_KEY } from '@/components/welcome/welcome-screen';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    let acknowledged = false;
    try {
      acknowledged = localStorage.getItem(WELCOME_ACK_KEY) === 'true';
    } catch {
      // storage unavailable (private mode / blocked) — just show the welcome screen
    }
    setShowWelcome(!acknowledged);
    setMounted(true);
  }, [hydrate]);

  useEffect(() => {
    if (mounted) {
      setShowAuth(!isAuthenticated);
    }
  }, [mounted, isAuthenticated]);

  const acknowledgeWelcome = () => {
    try {
      localStorage.setItem(WELCOME_ACK_KEY, 'true');
    } catch {
      // ignore — the screen is dismissed for this session either way
    }
    setShowWelcome(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomeScreen onContinue={acknowledgeWelcome} />;
  }

  if (showAuth) {
    return <AuthPage onSuccess={() => setShowAuth(false)} />;
  }

  return <Dashboard onLogout={() => setShowAuth(true)} />;
}