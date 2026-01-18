import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : null);
const TARGET = API_BASE ? `${API_BASE.replace(/\/$/, '')}/api/employees` : null;

const buildForwardHeaders = (request: NextRequest) => {
  const out: Record<string, string> = {};
  for (const [k, v] of request.headers) {
    const key = k.toLowerCase();
    // skip host; backend will set its own host
    if (key === 'host' || key === 'content-length') continue;
    // Forward cookies and authorization headers so backend sees authenticated user
    out[k] = v;
  }
  return out;
};

export async function GET(request: NextRequest) {
  try {
    if (!TARGET) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const headers = buildForwardHeaders(request);
    const resp = await fetch(TARGET, { method: 'GET', headers });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees GET proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!TARGET) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const headers = buildForwardHeaders(request);
    // preserve incoming content-type
    const contentType = request.headers.get('content-type');
    if (contentType && !headers['content-type']) headers['content-type'] = contentType;
    const body = await request.text();
    const resp = await fetch(TARGET, { method: 'POST', headers, body });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees POST proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}
