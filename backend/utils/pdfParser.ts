import pdf from "pdf-parse";
import fs from "fs";

export async function parsePDF(filePath: string) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);

  return {
    text: pdfData.text,
    numPages: pdfData.numpages,
  };
}
