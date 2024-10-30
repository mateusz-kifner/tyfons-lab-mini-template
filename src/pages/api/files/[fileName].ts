import { createReadStream } from "fs";
import { files } from "@/server/api/file/schema";
import { db } from "@/server/db/index.new";
import HTTPError from "@/utils/HTTPError";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

// FIXME: refactro this to use app router

export default async function Files(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			throw new HTTPError(405, `Method ${req.method as string} not allowed`);
		}

		if (req.query.fileName === undefined || Array.isArray(req.query.fileName)) {
			throw new HTTPError(422, "FileName cannot be processed");
		}
		if (Array.isArray(req.query.token)) {
			throw new HTTPError(422, "Token cannot be processed");
		}

		const { fileName, token } = req.query;
		const download = req.query.download === "";

		const file = await db.query.files.findFirst({
			where: eq(files.filename, fileName),
		});
		if (!file) {
			throw new HTTPError(404, "File not found");
		}
		// Check if correct token was provided, public resources have empty token
		if (!!file.token && (file.token ?? "") !== (token ?? "")) {
			throw new HTTPError(404, "File not found");
		}
		if (download) {
			// Download headers
			console.log(file?.originalFilename);
			res.setHeader(
				"Content-Disposition",
				`attachment; filename="${encodeURIComponent(
					file?.originalFilename ?? "",
				)}"`,
			);
			res.setHeader("Content-Type", "application/octet-stream");

			try {
				const fileStream = createReadStream(
					`./uploads/${file?.newFilename as string}`,
				);
				fileStream.pipe(res);
			} catch (e) {
				throw new HTTPError(404, "File not found");
			}
		} else {
			// View headers
			res.setHeader(
				"Content-Type",
				file.mimetype ?? "application/octet-stream",
			);
			try {
				const imageData = await fs.readFile(
					`./uploads/${file?.newFilename as string}`,
				);

				res.send(imageData);
			} catch (e) {
				throw new HTTPError(404, "File not found");
			}
		}
	} catch (err) {
		console.log(err);
		if (err instanceof HTTPError) {
			res.status(err.statusCode).json({
				status: "error",
				statusCode: err.statusCode,
				message: `${err.name}: ${err.message}`,
			});
			return;
		}
		console.log(err);
		res.status(500).json({
			status: "error",
			statusCode: 500,
			message: "UnknownError",
		});
		return;
	}
}
