import type { HttpMethod } from '@/types/types';

export function generateCurlCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const h = Object.entries(headers)
    .map(([k, v]) => `-H "${k}: ${v}"`)
    .join(' ');
  const b = body ? ` --data '${body}'` : '';
  return `curl -X ${method} ${h} "${url}"${b}`;
}

export function generateJavaScriptFetchCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  return `fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)}${
    body
      ? `,
  body: ${JSON.stringify(body)}`
      : ''
  }
}).then(r => r.text()).then(console.log);`;
}

export function generateJavaScriptXHRCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const set = Object.entries(headers)
    .map(([k, v]) => `xhr.setRequestHeader("${k}", "${v}");`)
    .join('\n');
  return `const xhr = new XMLHttpRequest();
xhr.open("${method}", "${url}");
${set}
xhr.onreadystatechange = () => { if (xhr.readyState === 4) console.log(xhr.status, xhr.responseText); };
xhr.send(${body ? JSON.stringify(body) : 'null'});`;
}

export function generateNodeJSCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  return `const res = await fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)}${
    body
      ? `,
  body: ${JSON.stringify(body)}`
      : ''
  }
});
console.log(await res.text());`;
}

export function generatePythonCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const hdr = JSON.stringify(headers).replace(/"/g, '\\"');
  const b = body ? `payload = ${body}\n` : '';
  return `import requests
url = "${url}"
headers = "${hdr}".replace('\\\\\\"','"')
${b}resp = requests.request("${method}", url, headers=eval(headers)${body ? ', data=payload' : ''})
print(resp.status_code, resp.reason)
print(resp.text)`;
}

export function generateJavaCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const hdr = Object.entries(headers)
    .flatMap(([k, v]) => [`"${k}"`, `"${v}"`])
    .join(', ');
  return `import java.net.http.*;import java.net.URI;
HttpClient c = HttpClient.newHttpClient();
HttpRequest.Builder b = HttpRequest.newBuilder().uri(URI.create("${url}"));
b.method("${method}", ${body ? `HttpRequest.BodyPublishers.ofString(${JSON.stringify(body)})` : 'HttpRequest.BodyPublishers.noBody()'});${
    hdr
      ? `
b.headers(${hdr});`
      : ''
  }
HttpResponse<String> r = c.send(b.build(), HttpResponse.BodyHandlers.ofString());
System.out.println(r.statusCode()+" "+r.body());`;
}

export function generateCSharpCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const set = Object.entries(headers)
    .filter(([key]) => key.toLowerCase() !== 'content-type')
    .map(
      ([key, value]) =>
        `client.DefaultRequestHeaders.Add("${key}", "${value}");`
    )
    .join('\n');
  const ct = headers['Content-Type'] || headers['content-type'];
  const content = body
    ? `var content = new StringContent(${JSON.stringify(body)}${ct ? `, System.Text.Encoding.UTF8, "${ct}"` : ''});`
    : 'HttpContent? content = null;';
  return `using var client = new HttpClient();
${set}
${content}
var req = new HttpRequestMessage(new HttpMethod("${method}"), "${url}") { Content = ${body ? 'content' : 'null'} };
var resp = await client.SendAsync(req);
Console.WriteLine((int)resp.StatusCode + " " + resp.ReasonPhrase);
Console.WriteLine(await resp.Content.ReadAsStringAsync());`;
}

export function generateGoCode(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null
): string {
  const set = Object.entries(headers)
    .map(([k, v]) => `req.Header.Set("${k}", "${v}")`)
    .join('\n\t');
  return `package main
import ("bytes";"fmt";"io";"net/http")
func main(){
\tvar body io.Reader = nil
\t${body ? `body = bytes.NewBufferString(${JSON.stringify(body)})` : ''}
\treq,_ := http.NewRequest("${method}", "${url}", body)
\t${set}
\tresp,_ := http.DefaultClient.Do(req)
\tdefer resp.Body.Close()
\tb,_ := io.ReadAll(resp.Body)
\tfmt.Println(resp.Status)
\tfmt.Println(string(b))
}`;
}
