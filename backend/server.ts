import express, { Request, Response } from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);

app.post("/api/upload", (req: Request, res: Response) => {
  // TODO: handle file upload & parsing
  res.json({ message: "File received successfully!" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
