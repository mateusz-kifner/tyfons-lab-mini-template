import type { db } from ".";
import type * as schema from "./schema";

export type DBType = typeof db;

export type ExtractStringLiterals<T> = T extends `${string}` ? T : never;

export type schemaNames = ExtractStringLiterals<keyof typeof db.query>;
export type schemaType = (typeof schema)[schemaNames];

export type MetadataType = {
	createdAt?: Date;
	createdById?: string;
	updatedAt?: Date;
	updatedById?: string;
};

export interface Err {
	success: false;
	error: string;
	errorObj?: Error;
}

export interface OK {
	success: true;
	message?: string;
}
