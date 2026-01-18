import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : null);

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!API_BASE) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const target = `${API_BASE.replace(/\/$/, '')}/api/employees/${params.id}`;
    const body = await request.text();
    const resp = await fetch(target, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body });
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees PUT proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!API_BASE) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const target = `${API_BASE.replace(/\/$/, '')}/api/employees/${params.id}`;
    const resp = await fetch(target, { method: 'DELETE' });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees DELETE proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}
