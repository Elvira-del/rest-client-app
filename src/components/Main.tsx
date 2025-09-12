import { useTranslations } from 'next-intl';
import { SignButton } from './SignButton';

export const Main = () => {
  const t = useTranslations('Main');

  return (
    <main>
      <div className="container">
        <section>
          <div className="text-center space-y-6 py-12">
            <h1 className="text-4xl lg:text-6xl">{t('hero.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex justify-center gap-4 pt-6">
              <SignButton role={'signin'} type={'button'} />
              <SignButton role={'signup'} type={'button'} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
