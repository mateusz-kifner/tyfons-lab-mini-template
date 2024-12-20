import type { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
	schema: "./src/server/db/schema.ts",
	dialect: "postgresql",
	out: "./src/server/db/migration",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	tablesFilter: ["tyfons-lab-mini-template_*"],
} satisfies Config;
