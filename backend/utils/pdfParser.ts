import pdf from "pdf-parse";
import fs from "fs";

export async function parsePDF(input: string | Buffer) {
  let dataBuffer: Buffer;

  if (typeof input === "string") {
    dataBuffer = fs.readFileSync(input); // file path
  } else {
    dataBuffer = input; // already a Buffer
  }

  const pdfData = await pdf(dataBuffer);

  return {
    text: pdfData.text,
    numPages: pdfData.numpages,
  };
}
