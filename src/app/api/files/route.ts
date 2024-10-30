import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.getAll("files")[0];
		const filePath = `./public/file/${file.name}`;
		await pump(file.stream(), fs.createWriteStream(filePath));
		return NextResponse.json({ status: "success", data: file.size });
	} catch (e) {
		return NextResponse.json({ status: "fail", data: e });
	}
}
