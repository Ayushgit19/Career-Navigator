import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export async function extractTextFromFile(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext === "txt") {
    return file.buffer.toString("utf-8");
  }

  if (ext === "pdf") {
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const data = await pdfParse(file.buffer); // ✅ use buffer directly
    return data.text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer: file.buffer }); // ✅ use buffer
    return result.value;
  }

  throw new Error("Unsupported file type");
}