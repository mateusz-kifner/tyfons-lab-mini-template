import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, {
	type NextAuthConfig,
	type DefaultSession,
	type Session as NextAuthSession,
} from "next-auth";
import Discord from "next-auth/providers/discord";
import { env } from "@/env";

import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@/server/db/schema";
import Nodemailer from "next-auth/providers/nodemailer";
import { db } from "./db";

export type { Session } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

const adapter = DrizzleAdapter(db, {
	usersTable: users,
	accountsTable: accounts,
	sessionsTable: sessions,
	verificationTokensTable: verificationTokens,
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = {
	adapter,
	// // In development, we need to skip checks to allow Expo to work
	// ...(!isSecureContext
	//   ? {
	//       skipCSRFCheck: skipCSRFCheck,
	//       trustHost: true,
	//     }
	//   : {}),
	secret: env.AUTH_SECRET,
	providers: [
		Discord,
		Nodemailer({
			server: {
				host: env.EMAIL_SERVER_HOST,
				port: env.EMAIL_SERVER_PORT,
				auth: {
					user: env.EMAIL_SERVER_USER,
					pass: env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: env.EMAIL_FROM,
		}),
	],
	callbacks: {
		session: (opts) => {
			if (!("user" in opts))
				throw new Error("unreachable with session strategy");

			return {
				...opts.session,
				user: {
					...opts.session.user,
					id: opts.user.id,
				},
			};
		},
	},
} satisfies NextAuthConfig;

export const validateToken = async (
	token: string,
): Promise<NextAuthSession | null> => {
	const sessionToken = token.slice("Bearer ".length);
	const session = await adapter.getSessionAndUser?.(sessionToken);
	return session
		? {
				user: {
					...session.user,
				},
				expires: session.session.expires.toISOString(),
			}
		: null;
};

export const invalidateSessionToken = async (token: string) => {
	const sessionToken = token.slice("Bearer ".length);
	await adapter.deleteSession?.(sessionToken);
};

const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export { handlers, auth, signIn, signOut };
