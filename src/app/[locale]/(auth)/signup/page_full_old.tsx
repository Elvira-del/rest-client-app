'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, type SignInInput } from '@/lib/validation/auth';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const t = useTranslations('Auth');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
  });
  const onSubmit = async (data: SignInInput) => {
    console.log('submit', data);
  };
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('signUpTitle')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('signUpSubtitle')}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            <div className="grid gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {t('errors.invalidEmail')}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  {t('password')}
                </label>
              </div>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {t('errors.passWrong')}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {t('minPassword')}
            </p>
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring focus:ring-primary"
            >
              {t('signin')}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              {t('haveAccount')}
              <Link
                href="/signup"
                className="ml-2 font-medium underline underline-offset-4 hover:no-underline"
              >
                {t('signinAccount')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
