import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_BASE } from '@/config/constants';

const TARGET = API_BASE ? `${API_BASE.replace(/\/$/, '')}/auth/me` : null;

export async function GET(request: NextRequest) {
  try {
    if (!TARGET) {
      return NextResponse.json({ success: false, message: 'API base not configured' }, { status: 500 });
    }

    // Read token from httpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    // Forward request to backend with Authorization header
    const response = await fetch(TARGET, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Auth/me proxy error:', err);
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
