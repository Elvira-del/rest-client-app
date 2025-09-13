export async function POST(request: Request): Promise<Response> {
  try {
    const { targetUrl, method = 'GET', headers, body } = await request.json();

    const apiResponse = await fetch(targetUrl, {
      method,
      headers: headers || { 'Content-Type': 'application/json' },
      body:
        method === 'GET' ? undefined : body ? JSON.stringify(body) : undefined,
    });

    const parsedData = await (async () => {
      try {
        return await apiResponse.json();
      } catch {
        return await apiResponse.text();
      }
    })();

    return new Response(
      JSON.stringify({
        data: parsedData,
      }),
      {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
