import { BodyEditor } from '@/components/BodyEditor';
import { HeadersEditor } from '@/components/HeadersEditor';
import { MethodEndpointBar } from '@/components/MethodEndpointBar';
import { ResponseViewer } from '@/components/ResponseViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';

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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Generated Code</Label>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code></code>
                  </pre>
                </div>
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
