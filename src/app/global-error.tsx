'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { AlertTriangle, RotateCcw, Bug } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-black/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <CardTitle>Something went wrong</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md border border-black/10 bg-black/5">
            <div className="flex items-center gap-2 border-b px-3 py-2 text-xs uppercase">
              <Bug className="h-4 w-4" />
              <span>Detalis: </span>
            </div>
            <pre className="p-3 text-sm">
              <code>{error.message}</code>
              {error?.digest ? (
                <>
                  <code className="opacity-60">digest: {error.digest}</code>
                </>
              ) : null}
            </pre>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              onClick={() => reset()}
              className="border border-black bg-black text-white"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
