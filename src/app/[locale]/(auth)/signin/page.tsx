'use client';

import AuthForm, { type AuthValues } from '@/components/AuthForm';

export default function SignInPage() {
  const onSubmit = async (data: AuthValues) => {
    console.log(data);
  };

  return (
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
  );
}
