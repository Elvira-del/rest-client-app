export async function proxyFetch(
  targetUrl: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: Record<string, string | number>;
  } = {}
) {
  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      targetUrl,
      method: options.method || "GET",
      headers: options.headers,
      body: options.body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
  }

  const result = await response.json(); //или тут можно .text()
  return result.data;
}