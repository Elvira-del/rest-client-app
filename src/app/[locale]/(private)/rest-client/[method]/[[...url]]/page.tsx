import { BodyEditor } from '@/components/BodyEditor';
import { GeneratedCode } from '@/components/GeneratedCode';
import { HeadersEditor } from '@/components/HeadersEditor';
import { MethodEndpointBar } from '@/components/MethodEndpointBar';
import { ResponseViewer } from '@/components/ResponseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RestClientPage() {
  return (
    <section>
      <div className="container max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl mb-2">REST Client Page</h1>
          <p className="text-muted-foreground">
            Make HTTP requests and test APIs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MethodEndpointBar />
            <Tabs className="w-full" defaultValue="headers">
              <TabsList>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="code">Generated Code</TabsTrigger>
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

        {/* TODO: Error Display */}
        <ResponseViewer />
      </div>
    </section>
  );
}
