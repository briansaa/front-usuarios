import { NextRequest, NextResponse } from "next/server";
import { hasRole, validateToken, Roles } from "@/lib/utils/jwtManage";
import { getCookie } from "@/lib/utils/cookiesManage";

export async function middleware(request: NextRequest) {

    const token = getCookie('jwt-token')

    if (!token) return NextResponse.redirect(new URL('/login', request.url))

    const jwt = await validateToken(token)

    if (!jwt) return NextResponse.redirect(new URL('/login', request.url))

    if (request.nextUrl.pathname == '/') {
        if (hasRole(jwt, Roles.ADMIN_ROLE)) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!login|_next/static|_next/image|favicon.ico).*)',
    ],
}