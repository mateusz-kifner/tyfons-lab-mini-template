import { pgTableCreator } from "drizzle-orm/pg-core";
import { env } from "../../env.mjs";

export const pgTable = pgTableCreator(
	(name) => `${env.DATABASE_PREFIX}${name}`,
);
