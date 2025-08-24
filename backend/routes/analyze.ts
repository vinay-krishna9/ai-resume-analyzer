import { Router } from "express";
import formidable, { File } from "formidable";
import { parsePDF } from "../utils/pdfParser";

const router = Router();

router.post("/", (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parse error" });

    let file: File | undefined;
    console.log(file);

    if (Array.isArray(files.file)) {
      file = files.file[0];
    } else {
      file = files.file as File | undefined;
    }
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const text = await parsePDF(file.filepath);

    // Mock analysis for now
    const mockResults = {
      role: "Frontend Engineer",
      skillsFound: ["React", "JavaScript", "HTML", "CSS"],
      missingSkills: ["TypeScript", "Next.js"],
      score: 70,
      suggestions: ["Add Next.js experience", "Mention TypeScript explicitly"],
      extractedText: text.text.slice(0, 200) + "...",
    };

    res.json(mockResults);
  });
});

export default router;
