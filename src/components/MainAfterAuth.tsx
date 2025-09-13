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

export const MainAfterAuth = () => {
  return (
    <section>
      <div className="container max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">Welcome back, UserName!</h1>
          <p className="text-muted-foreground">
            Choose an option to get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Send className="h-6 w-6 text-primary" />
                REST Client
              </CardTitle>
              <CardDescription>
                Make HTTP requests and test APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/rest-client'}>
                <Button className="w-full">Open REST Client</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <History className="h-6 w-6 text-primary" />
                History
              </CardTitle>
              <CardDescription>View your request history</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/history'}>
                <Button className="w-full" variant="outline">
                  View History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                Variables
              </CardTitle>
              <CardDescription>
                Manage your environment variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={'/variables'}>
                <Button className="w-full" variant="outline">
                  Manage Variables
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
