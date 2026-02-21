import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export interface ISessionData {
  tiragens: number;
  creditedSessions: string[];
  email?: string;
}

const SESSION_OPTIONS = {
  password: process.env.SESSION_SECRET || "change-me-in-production-min-32-chars!!",
  cookieName: "tarot_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    path: "/",
  },
};

const MAX_CREDITED_SESSIONS = 30;

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<ISessionData>(cookieStore, SESSION_OPTIONS);
}

export function trimCreditedSessions(sessions: string[]) {
  if (sessions.length <= MAX_CREDITED_SESSIONS) return sessions;
  return sessions.slice(-MAX_CREDITED_SESSIONS);
}
