"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isValidToken } from "@/utils/auth-service";

const cookie = {
	name: "auth_token",
	options: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	},
};
const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 1 week
export async function createSession(token: string) {
	const expires = new Date(Date.now() + MAX_AGE);
	(await cookies()).set(cookie.name, token, {
		...cookie.options,
		sameSite: "lax",
		expires,
	});
}

export async function verifySession(): Promise<boolean> {
	const token = (await cookies()).get(cookie.name)?.value;
	if (!token || !(await isValidToken(token))) {
		return false;
	}
	return true;
}

export async function deleteSession() {
	(await cookies()).delete(cookie.name);
	redirect("/login");
}
export async function getToken(): Promise<string | undefined> {
	return (await cookies()).get(cookie.name)?.value;
}

export type TokenUser = {
	sub: string;
	email: string;
	roles: string[];
};

/**
 * Decode JWT payload to get user info server-side.
 * Does NOT verify the token - backend will verify on API calls.
 * Use this for role checks in middleware/API routes.
 */
export async function getAuthUserFromToken(): Promise<TokenUser | null> {
	const token = await getToken();
	if (!token) return null;

	try {
		const parts = token.split('.');
		if (parts.length !== 3) return null;
		const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
		return {
			sub: payload.sub || payload.userId || payload.id,
			email: payload.email || '',
			roles: payload.roles || [],
		};
	} catch {
		return null;
	}
}
