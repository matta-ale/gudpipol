export async function GET() {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    return Response.json(
      { ok: false, error: 'BACKEND_URL or NEXT_PUBLIC_BACKEND_URL is not configured' },
      { status: 500 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${backendUrl.replace(/\/$/, '')}/health`;
    const upstream = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return Response.json({
      ok: upstream.ok,
      backendStatus: upstream.status,
      pingedAt: new Date().toISOString(),
      target: url,
    });
  } catch (error) {
    clearTimeout(timeoutId);

    return Response.json(
      {
        ok: false,
        error: error?.name === 'AbortError' ? 'timeout' : 'request_failed',
        detail: error?.message || 'Unknown error',
      },
      { status: 504 }
    );
  }
}
