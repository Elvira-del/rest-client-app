'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AuthForm, { type AuthValues } from '@/components/AuthForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import type { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase/firebase';

export default function SignUpPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthValues) => {
    try {
      setError(null);
      setLoading(true);
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as FirebaseError;
        setError(t('errors.signUpFailed'));
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            setError(t('errors.emailInUse'));
            break;
          case 'auth/invalid-email':
            setError(t('errors.invalidEmail'));
            break;
          case 'auth/weak-password':
            setError(t('errors.weakPassword'));
            break;
          default:
            setError(t('errors.signUpFailed'));
        }
      } else {
        setError(t('errors.signUpFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}
      <AuthForm
        onSubmit={onSubmit}
        texts={{
          titleKey: 'signUpTitle',
          subtitleKey: 'signUpSubtitle',
          submitKey: 'signup',
        }}
        footer={{
          promptKey: 'haveAccount',
          linkHref: '/signin',
          linkKey: 'signinAccount',
        }}
      />
      {loading && (
        <div className="text-center mt-4">
          {t('loading')}
        </div>
      )}
    </>
  );
}