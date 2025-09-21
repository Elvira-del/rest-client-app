'use client';

import { MainAfterAuth } from '@/components/MainAfterAuth';
import { MainBeforeAuth } from '@/components/MainBeforeAuth';
import { useAuth } from '@/lib/hooks/useAith';

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <main className="flex flex-col gap-10">
      {!loading && user ? <MainAfterAuth /> : <MainBeforeAuth />}
    </main>
  );
}
