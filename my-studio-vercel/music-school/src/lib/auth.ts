import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "music_school_session";
<<<<<<< HEAD
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
=======
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 วัน

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Please add it to .env.local");
  }
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  userId: number;
<<<<<<< HEAD
  role: "admin" | "teacher" | "student";
=======
  role: "admin" | "student";
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  name: string;
  email: string;
};

<<<<<<< HEAD
export async function hashPassword(password: string) { return bcrypt.hash(password, 10); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
=======
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
<<<<<<< HEAD
  } catch { return null; }
=======
  } catch {
    return null;
  }
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
}

export async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHENTICATED");
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (session.role !== "admin") throw new Error("FORBIDDEN");
  return session;
}

<<<<<<< HEAD
export async function requireTeacherOrAdmin() {
  const session = await requireSession();
  if (session.role !== "admin" && session.role !== "teacher") throw new Error("FORBIDDEN");
  return session;
}

=======
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
export { SESSION_COOKIE };
