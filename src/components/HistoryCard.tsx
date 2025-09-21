'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export type RequestCardProps = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  status: string;
  statusText?: string;
  date?: string;
  time?: string;
};

export default function HistoryCard({
  method,
  url,
  status,
  statusText,
  date,
  time,
}: RequestCardProps) {
  return (
    <Card className="relative border shadow-sm hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center text-center gap-3">
            <CardTitle className="text-base">{method}</CardTitle>
            <CardDescription className="text-neutral-500">
              {url}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-black text-white px-2 py-1 rounded-md">
              {`${status} ${statusText}`}
            </span>
            <div className="flex gap-1 text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">{date ?? '—'}</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">{time ?? '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
