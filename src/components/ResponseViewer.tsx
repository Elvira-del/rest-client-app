'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useRestClientStore } from '@/store/useRestClientStore';
import { useTranslations } from 'next-intl';

export const ResponseViewer = () => {
  const t = useTranslations('ResponseViewer');

  const response = useRestClientStore((state) => state.response);

  if (!response) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('title')}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge>
              {response?.status !== undefined
                ? `${response?.status}${response?.statusText}`
                : '-'}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {response ? `${response?.time} ms` : '-'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="body">
          <TabsList>
            <TabsTrigger value="body">{t('tabs.body')}</TabsTrigger>
            <TabsTrigger value="headers">{t('tabs.headers')}</TabsTrigger>
          </TabsList>

          <TabsContent value="body">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-96">
              <code>{response?.body}</code>
            </pre>
          </TabsContent>

          <TabsContent value="headers">
            {response && Object.keys(response.headers).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex gap-4 py-1">
                    <span className="font-mono text-sm min-w-32">{key}:</span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {t('noHeaders')}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
