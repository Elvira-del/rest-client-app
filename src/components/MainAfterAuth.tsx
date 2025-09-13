import { Send, History, Settings } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const MainAfterAuth = () => {
  const t = useTranslations('MainAfterAuth');
  const username = 'example';

  return (
    <section>
      <div className="container max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">{t('title', { username })}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Send className="h-6 w-6 text-primary" />
                {t('rest-client.title')}
              </CardTitle>
              <CardDescription>{t('rest-client.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/rest-client'}>
                <Button className="w-full">{t('rest-client.button')}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <History className="h-6 w-6 text-primary" />
                {t('history.title')}
              </CardTitle>
              <CardDescription>{t('history.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/history'}>
                <Button className="w-full" variant="outline">
                  {t('history.button')}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                {t('variables.title')}
              </CardTitle>
              <CardDescription>{t('variables.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/variables'}>
                <Button className="w-full" variant="outline">
                  {t('variables.button')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
