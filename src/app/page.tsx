'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import AuthPage from '@/components/auth/auth-page';
import Dashboard from '@/components/dashboard/dashboard';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  useEffect(() => {
    if (mounted) {
      setShowAuth(!isAuthenticated);
    }
  }, [mounted, isAuthenticated]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (showAuth) {
    return <AuthPage onSuccess={() => setShowAuth(false)} />;
  }

  return <Dashboard onLogout={() => setShowAuth(true)} />;
}