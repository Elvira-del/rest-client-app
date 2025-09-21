'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AuthForm, { type AuthValues } from '@/components/AuthForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import type { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase/firebase';

export default function SignInPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthValues) => {
    try {
      setError(null);
      setLoading(true);
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as FirebaseError;
        setError(t('errors.signInFailed'));
        switch (firebaseError.code) {
          case 'auth/user-not-found':
            setError(t('errors.userNotFound'));
            break;
          case 'auth/wrong-password':
            setError(t('errors.passWrong'));
            break;
          case 'auth/invalid-email':
            setError(t('errors.invalidEmail'));
            break;
          default:
            setError(t('errors.signInFailed'));
        }
      } else {
        setError(t('errors.signInFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      <AuthForm
        onSubmit={onSubmit}
        texts={{
          titleKey: 'signinTitle',
          subtitleKey: 'signinSubtitle',
          submitKey: 'signin',
        }}
        footer={{
          promptKey: 'noAccount',
          linkHref: '/signup',
          linkKey: 'createAccount',
        }}
      />
      {loading && <div className="text-center mt-4">{t('loading')}</div>}
    </>
  );
}
