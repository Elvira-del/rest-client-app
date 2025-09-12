import { useTranslations } from 'next-intl';
import { SignButton } from './SignButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code } from 'lucide-react';

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

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                <h2>{t('about.subtitle')}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.content')}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
