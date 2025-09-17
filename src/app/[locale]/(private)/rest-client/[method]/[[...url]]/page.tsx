import { HeadersEditor } from '@/components/HeadersEditor';
import { MethodEndpointBar } from '@/components/MethodEndpointBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
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
                <div className="space-y-2">
                  <Label>Body</Label>
                  <Textarea
                    className="min-h-[200px] font-mono"
                    placeholder='{"key": "value"}'
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Format JSON
                    </Button>
                  </div>
                </div>
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
        {/* Response Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Response</CardTitle>
              <div className="flex items-center gap-2">
                <Badge>Response status</Badge>
                <span className="text-sm text-muted-foreground">Time ms</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="body">
              <TabsList>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>

              <TabsContent value="body">
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-96">
                  <code>Response Body</code>
                </pre>
              </TabsContent>

              <TabsContent value="headers">
                <div className="space-y-2">
                  <div className="flex gap-4 py-1">
                    <span className="font-mono text-sm min-w-32">Key:</span>
                    <span className="font-mono text-sm text-muted-foreground">
                      Value
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
