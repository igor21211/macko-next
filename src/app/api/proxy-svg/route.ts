import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Если URL относительный, добавляем базовый домен
    let fullUrl = url;
    if (url.startsWith('/')) {
      fullUrl = `https://macko-doors.md-design.pw${url}`;
    }

    const response = await fetch(fullUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch SVG' }, { status: response.status });
    }

    const svgText = await response.text();

    return new NextResponse(svgText, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error proxying SVG:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
