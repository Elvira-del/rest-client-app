import { useTranslations } from 'next-intl';
import { SignButton } from './SignButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  CircleCheckBig,
  Clock,
  Code,
  Globe,
  Send,
  Settings,
  Shield,
} from 'lucide-react';

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

        <section>
          <div className="space-y-6">
            <h2 className="text-2xl text-center">{t('features.subtitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Send className="h-5 w-5 text-primary" />
                    <h3>{t('features.request.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.request.content')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3>{t('features.history.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.history.content')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5 text-primary" />
                    <h3>{t('features.variables.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.variables.content')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3>{t('features.auth.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.auth.content')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3>{t('features.lang.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.lang.content')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CircleCheckBig className="h-5 w-5 text-primary" />
                    <h3>{t('features.stack.title')}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('features.stack.content')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
