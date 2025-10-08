'use client';

import { useMemo, useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRestClientStore } from '@/store/useRestClientStore';
import {
  headersRowsToObject,
  methodCanHaveBody,
  normalizeJsonOrNull,
} from '@/lib/base64';
import {
  generateCSharpCode,
  generateCurlCode,
  generateGoCode,
  generateJavaCode,
  generateJavaScriptFetchCode,
  generateJavaScriptXHRCode,
  generateNodeJSCode,
  generatePythonCode,
} from '@/lib/generateCode';
import { useTranslations } from 'next-intl';

const languages = [
  { value: 'curl', label: 'cURL' },
  { value: 'javascript-fetch', label: 'JavaScript (Fetch API)' },
  { value: 'javascript-xhr', label: 'JavaScript (XHR)' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
];

export const GeneratedCode = () => {
  const t = useTranslations('GeneratedCode');

  const method = useRestClientStore((state) => state.method);
  const endpoint = useRestClientStore((state) => state.endpoint);
  const headers = useRestClientStore((state) => state.headers);
  const body = useRestClientStore((state) => state.body);

  const [language, setLanguage] = useState<string>('curl');

  const url = endpoint.trim();
  const headersObj = headersRowsToObject(headers);
  const canBody = methodCanHaveBody(method);
  const bodyJson = useMemo(
    () => (canBody ? normalizeJsonOrNull(body) : null),
    [canBody, body]
  );

  const code = useMemo(() => {
    if (!url) return t('noUrlHint');

    switch (language) {
      case 'curl':
        return generateCurlCode(method, url, headersObj, bodyJson);
      case 'javascript-fetch':
        return generateJavaScriptFetchCode(method, url, headersObj, bodyJson);
      case 'javascript-xhr':
        return generateJavaScriptXHRCode(method, url, headersObj, bodyJson);
      case 'nodejs':
        return generateNodeJSCode(method, url, headersObj, bodyJson);
      case 'python':
        return generatePythonCode(method, url, headersObj, bodyJson);
      case 'java':
        return generateJavaCode(method, url, headersObj, bodyJson);
      case 'csharp':
        return generateCSharpCode(method, url, headersObj, bodyJson);
      case 'go':
        return generateGoCode(method, url, headersObj, bodyJson);
      default:
        return '';
    }
  }, [t, language, method, url, headersObj, bodyJson]);

  const handleChangeLanguage = (value: string) => {
    setLanguage(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{t('label')}</Label>
        <Button variant="outline" size="sm" disabled={!url}>
          <Copy className="h-4 w-4 mr-2" />
          {t('copy')}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Select value={language} onValueChange={handleChangeLanguage}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {t(`languages.${lang.value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};
