import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './app/lib/utils';

export function middleware(req: NextRequest) {
    const token = req.cookies.get(ACCESS_TOKEN)

    if (req.url.includes('/auth') && !token) {
        return NextResponse.next();
    }

    if (req.url.includes('/auth') && token) {
        return NextResponse.redirect(new URL('/chatapp', req.url));
    }

     if (!token && !req.url.includes('/auth')) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }
    

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/chat-page', '/profile', '/auth', '/chatapp'],
};