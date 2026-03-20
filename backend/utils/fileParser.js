import fs from "fs";
import mammoth from "mammoth";

export async function extractTextFromFile(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext === "txt") {
    return file.buffer.toString("utf-8");
  }

  if (ext === "pdf") {
    // This env variable disables the test file that causes the bug
    process.env.PDF_PARSE_NO_TEST = "true";
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(file.buffer);
    return data.text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
}