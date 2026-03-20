import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromFile(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (ext === "txt") {
    return fs.readFileSync(file.path, "utf-8");
  }

  if (ext === "pdf") {
    const buffer = fs.readFileSync(file.path);
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDoc = await loadingTask.promise;

    let text = "";
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value;
  }

  throw new Error("Unsupported file type");
}