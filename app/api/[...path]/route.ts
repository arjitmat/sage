import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// Increase timeout to 5 minutes for long-running operations
export const maxDuration = 300;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const url = `${BACKEND_URL}/api/${pathString}${request.nextUrl.search}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // No timeout - let it run
    });

    // Try to parse as JSON, fall back to text if it fails
    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { detail: text || 'Unknown error' };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { detail: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const url = `${BACKEND_URL}/api/${pathString}`;

  try {
    const contentType = request.headers.get('content-type') || '';
    let body: any;
    let headers: HeadersInit = {
      'Cookie': request.headers.get('cookie') || '',
    };

    // Handle FormData (file uploads)
    if (contentType.includes('multipart/form-data')) {
      body = await request.formData();
      // Don't set Content-Type - let fetch set it with boundary
    } else {
      // Handle JSON
      body = JSON.stringify(await request.json());
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      // No timeout - let it run as long as needed
    });

    // Try to parse as JSON, fall back to text if it fails
    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { detail: text || 'Unknown error' };
    }

    // Forward cookies from backend to frontend
    const setCookieHeader = response.headers.get('set-cookie');
    const responseHeaders: HeadersInit = {};
    if (setCookieHeader) {
      responseHeaders['set-cookie'] = setCookieHeader;
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders
    });
  } catch (error: any) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { detail: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const url = `${BACKEND_URL}/api/${pathString}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Try to parse as JSON, fall back to text if it fails
    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { detail: text || 'Unknown error' };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { detail: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
