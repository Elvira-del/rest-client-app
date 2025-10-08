import { BodyEditor } from '@/components/BodyEditor';
import { GeneratedCode } from '@/components/GeneratedCode';
import { HeadersEditor } from '@/components/HeadersEditor';
import { MethodEndpointBar } from '@/components/MethodEndpointBar';
import { ResponseViewer } from '@/components/ResponseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';

export default function RestClientPage() {
  const t = useTranslations('RestClientPage');

  return (
    <section className="flex-1 p-6 space-y-6">
      <div className="container max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('requestCardTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MethodEndpointBar />
            <Tabs className="w-full" defaultValue="headers">
              <TabsList>
                <TabsTrigger value="headers">{t('tabs.headers')}</TabsTrigger>
                <TabsTrigger value="body">{t('tabs.body')}</TabsTrigger>
                <TabsTrigger value="code">{t('tabs.code')}</TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-4" value="headers">
                <HeadersEditor />
              </TabsContent>

              <TabsContent value="body">
                <BodyEditor />
              </TabsContent>

              <TabsContent value="code">
                <GeneratedCode />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ResponseViewer />
      </div>
    </section>
  );
}
