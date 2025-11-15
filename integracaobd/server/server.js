import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const DATA_PATH = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "fakeLibraryDB.json"
);

async function readData() {
  const content = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(content);
}

app.get("/", (_req, res) => {
  res.send("Servidor da fakeLibraryDB ativo. Veja /api/books");
});

// Retorna todo o objeto books
app.get("/api/books", async (_req, res) => {
  try {
    const data = await readData();
    res.json(data.books ?? data);
  } catch (err) {
    console.error("Erro ao ler dados:", err);
    res.status(500).json({ error: "Não foi possível ler os dados" });
  }
});

// Retorna livros por categoria (ex: /api/books/javascript)
app.get("/api/books/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const data = await readData();
    const books = data.books?.[category];
    if (!books)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(books);
  } catch (err) {
    console.error("Erro ao ler dados:", err);
    res.status(500).json({ error: "Não foi possível ler os dados" });
  }
});

// Retorna um livro por id (procura em todas as categorias)
app.get("/api/book/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = await readData();
    const booksByCategory = data.books ?? {};
    for (const category of Object.keys(booksByCategory)) {
      const found = booksByCategory[category].find((b) => Number(b.id) === id);
      if (found) return res.json(found);
    }
    res.status(404).json({ error: "Livro não encontrado" });
  } catch (err) {
    console.error("Erro ao ler dados:", err);
    res.status(500).json({ error: "Não foi possível ler os dados" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
