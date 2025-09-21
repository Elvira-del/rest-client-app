'use client';

import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HistoryCard from '@/components/HistoryCard';
import { Trash2 } from 'lucide-react';
type type_history_data = React.ComponentProps<typeof HistoryCard>;

const history_data: type_history_data[] = [
  {
    id: '1',
    method: 'GET',
    url: 'https://swapi.dev/api/people/1/',
    status: 'ok',
    statusText: '200',
    date: '2025-09-20',
    time: '10:00:00',
  },
  {
    id: '2',
    method: 'GET',
    url: 'https://swapi.dev/api/people/2/',
    status: 'unauthorized',
    statusText: '401 Unauthorized',
    date: '2025-09-20',
    time: '10:10:00',
  },
  {
    id: '3',
    method: 'GET',
    url: 'https://swapi.dev/api/people/3/',
    status: 'ok',
    statusText: '200',
    date: '2025-09-20',
    time: '10:01:05',
  },
];

export default function HistoryPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Request History</CardTitle>
          {history_data.length ? (
            <CardDescription className="text-base mt-1">
              {history_data.length + ' requests found'}
            </CardDescription>
          ) : (
            <CardDescription className="text-base mt-1">
              Your request history will appear here
            </CardDescription>
          )}
        </div>
        {history_data.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 p-4"
            onClick={() => {
              console.log('Clear history');
            }}
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </Button>
        )}
      </div>
      {!history_data.length && (
        <div className="p-2 rounded-lg border-1">
          <p className="mx-4 text-sm text-muted-foreground">
            No requests found. Start making requests in the REST client to see
            them here.
          </p>
        </div>
      )}
      {history_data && (
        <section className="flex flex-col flex-wrap gap-4">
          {history_data.map((item) => (
            <HistoryCard key={item.id} {...item} />
          ))}
        </section>
      )}
      <div className="flex justify-center mt-6">
        <Link href="/rest-client">
          <Button className="mt-2">Go to REST Client</Button>
        </Link>
      </div>
    </main>
  );
}
