import "dotenv/config";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import handler from "./api/classify.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/classify", handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const keyStatus = process.env.OPENROUTER_API_KEY ? "configured" : "MISSING - set OPENROUTER_API_KEY in .env";
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`OpenRouter API key: ${keyStatus}`);
});
