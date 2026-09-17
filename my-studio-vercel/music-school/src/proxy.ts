import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "music_school_session";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

async function getSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
<<<<<<< HEAD
    return payload as { userId: number; role: "admin" | "teacher" | "student" };
  } catch { return null; }
=======
    return payload as { userId: number; role: "admin" | "student" };
  } catch {
    return null;
  }
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSessionFromRequest(req);

  const isAdminRoute = pathname.startsWith("/admin");
<<<<<<< HEAD
  const isTeacherRoute = pathname.startsWith("/teacher");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if ((isAdminRoute || isTeacherRoute || isDashboardRoute) && !session) {
=======
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if ((isAdminRoute || isDashboardRoute) && !session) {
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
<<<<<<< HEAD
  if (isAdminRoute && session && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (isTeacherRoute && session && session.role !== "teacher" && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
=======

  if (isAdminRoute && session && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  matcher: ["/admin/:path*", "/teacher/:path*", "/dashboard/:path*"],
=======
  matcher: ["/admin/:path*", "/dashboard/:path*"],
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
};
