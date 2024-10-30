import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const { env } = await import("../../env.js");

async function main() {
	console.log("⏳ Running migrations...");
	const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
	const migrationDb = drizzle(migrationClient, { schema, logger: true });

	// This will run migrations on the database, skipping the ones already applied
	await migrate(migrationDb, { migrationsFolder: "./src/server/db/migration" });

	// Don't forget to close the connection, otherwise the script will hang
	await migrationClient.end();

	console.log("✅ Migration completed");

	process.exit(0);
}

main().catch((error) => {
	console.error("❌ Migration failed");
	console.log(error);
	process.exit(1);
});
