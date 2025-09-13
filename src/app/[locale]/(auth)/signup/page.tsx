'use client';

import AuthForm, { type AuthValues } from '@/components/AuthForm';

export default function SignUpPage() {
  const onSubmit = async (data: AuthValues) => {
    console.log(data);
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      texts={{
        titleKey: 'signUpTitle',
        subtitleKey: 'signUpSubtitle',
        submitKey: 'signin',
      }}
      footer={{
        promptKey: 'haveAccount',
        linkHref: '/signin',
        linkKey: 'signinAccount',
      }}
    />
  );
}
