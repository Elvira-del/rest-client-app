import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

type SignButtonProps = {
  role: 'signin' | 'signup' | 'signout';
  type: 'button' | 'submit' | 'reset';
};

export const SignButton = ({ role, type }: SignButtonProps) => {
  const t = useTranslations('SignButton');

  return (
    <Button variant={role === 'signin' ? 'outline' : 'default'} type={type}>
      {t(role)}
    </Button>
  );
};
