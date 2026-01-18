import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : null);
const TARGET = API_BASE ? `${API_BASE.replace(/\/$/, '')}/api/employees` : null;

export async function GET() {
  try {
    if (!TARGET) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const resp = await fetch(TARGET, { method: 'GET' });
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees GET proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!TARGET) return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    const body = await request.text();
    const resp = await fetch(TARGET, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error('Employees POST proxy error', err);
    return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}
