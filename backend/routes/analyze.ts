import { Router } from "express";
import formidable, { File as FormidableFile } from "formidable";
import { parsePDF } from "../utils/pdfParser";

const router = Router();

router.post("/", (req, res) => {
  console.log("Received file upload request");

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parse error" });

    // files.file can be FormidableFile | FormidableFile[]
    let uploadedFile: FormidableFile | undefined;
    const f = files.file;

    if (Array.isArray(f)) {
      uploadedFile = f[0]; // ✅ unwrap first element
    } else if (f !== undefined) {
      uploadedFile = f as FormidableFile;
    }

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(
      "Received file:",
      uploadedFile.originalFilename,
      uploadedFile.size,
      uploadedFile.filepath
    );

    try {
      const text = await parsePDF(uploadedFile.filepath);

      res.json(text);
    } catch (err) {
      console.error("PDF parse error:", err);
      res.status(500).json({ error: "Failed to parse PDF" });
    }
  });
});

export default router;
