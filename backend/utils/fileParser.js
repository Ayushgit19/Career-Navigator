import fs from "fs";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export async function extractTextFromFile(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext === "txt") {
    return fs.readFileSync(file.path, "utf-8");
  }

  if (ext === "pdf") {
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value;
  }

  throw new Error("Unsupported file type");
}