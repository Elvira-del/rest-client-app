'use client';

import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

type SignButtonProps = {
  role: 'signin' | 'signup' | 'signout' | 'backhome';
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void | Promise<void>;
};

export const SignButton = ({ role, type, onClick }: SignButtonProps) => {
  const t = useTranslations('SignButton');
  return (
    <Button
      variant={role === 'signin' ? 'outline' : 'default'}
      type={type}
      onClick={onClick}
    >
      {t(role)}
    </Button>
  );
};
