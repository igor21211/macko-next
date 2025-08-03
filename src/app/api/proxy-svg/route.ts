import { NextRequest, NextResponse } from 'next/server';

// Конфигурация базового домена
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'https://macko-doors.md-design.pw';

// Максимальный размер SVG в байтах (1MB)
const MAX_SVG_SIZE = 1024 * 1024;

// Разрешённые домены
const ALLOWED_DOMAINS = ['macko-doors.md-design.pw', 'localhost'];

// Функция валидации URL
function validateUrl(url: string): { isValid: boolean; fullUrl?: string; error?: string } {
  try {
    let fullUrl = url;

    // Относительные URL - добавляем базовый домен
    if (url.startsWith('/')) {
      fullUrl = `${BASE_DOMAIN}${url}`;
    }

    const urlObj = new URL(fullUrl);

    // Проверяем протокол
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
    }

    // Проверяем домен
    if (!ALLOWED_DOMAINS.includes(urlObj.hostname)) {
      return { isValid: false, error: 'Domain not allowed' };
    }

    // Проверяем на локальные IP
    const hostname = urlObj.hostname;
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      hostname === '0.0.0.0'
    ) {
      // Разрешаем только в development режиме
      if (process.env.NODE_ENV !== 'development') {
        return { isValid: false, error: 'Local IPs not allowed in production' };
      }
    }

    return { isValid: true, fullUrl };
  } catch (error) {
    console.error('Error validating URL:', error);
    return { isValid: false, error: 'Invalid URL format' };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Валидация URL
  const validation = validateUrl(url);
  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const response = await fetch(validation.fullUrl!);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch SVG' }, { status: response.status });
    }

    // Проверяем Content-Type
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('image/svg+xml') && !contentType?.includes('text/xml')) {
      return NextResponse.json({ error: 'Invalid content type. Expected SVG.' }, { status: 400 });
    }

    // Проверяем размер
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_SVG_SIZE) {
      return NextResponse.json({ error: 'SVG file too large' }, { status: 413 });
    }

    const svgText = await response.text();

    // Дополнительная проверка размера
    if (svgText.length > MAX_SVG_SIZE) {
      return NextResponse.json({ error: 'SVG content too large' }, { status: 413 });
    }

    // Проверяем, что это действительно SVG
    if (!svgText.trim().startsWith('<svg') && !svgText.includes('<svg')) {
      return NextResponse.json({ error: 'Invalid SVG content' }, { status: 400 });
    }

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
