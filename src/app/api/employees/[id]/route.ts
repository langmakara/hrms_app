import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : null);

export async function PUT(request: NextRequest, context: any) {
  try {
    // normalize context.params - sometimes Next types provide a Promise
    const paramsResolved = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
    const id = paramsResolved?.id;
    if (!API_BASE) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const target = `${API_BASE.replace(/\/$/, '')}/api/employees/${id}`;
    // forward headers (cookies/auth) and preserve content-type
    const headers: Record<string, string> = {};
    for (const [k, v] of request.headers) {
      const key = k.toLowerCase();
      if (key === 'host' || key === 'content-length') continue;
      headers[k] = v;
    }
    const contentType = request.headers.get('content-type');
    if (contentType && !headers['content-type']) headers['content-type'] = contentType;
    const body = await request.text();
    const resp = await fetch(target, { method: 'PUT', headers, body });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees PUT proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const paramsResolved = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
    const id = paramsResolved?.id;
    if (!API_BASE) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const target = `${API_BASE.replace(/\/$/, '')}/api/employees/${id}`;
    const headers: Record<string, string> = {};
    for (const [k, v] of request.headers) {
      const key = k.toLowerCase();
      if (key === 'host' || key === 'content-length') continue;
      headers[k] = v;
    }
    const resp = await fetch(target, { method: 'DELETE', headers });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees DELETE proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}
