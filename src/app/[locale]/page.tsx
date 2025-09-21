'use client';

import { MainAfterAuth } from '@/components/MainAfterAuth';
import { MainBeforeAuth } from '@/components/MainBeforeAuth';
import { useAuth } from '@/lib/hooks/useAith';

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      {!loading && user ? <MainAfterAuth /> : <MainBeforeAuth />}
    </main>
  );
}
