const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

const notes = [];
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/notes", (_req, res) => res.json(notes));
app.post("/api/notes", (req, res) => {
  const { text } = req.body;
  // Security: Validate type and length
  if (typeof text != "string" || !text.length || text.length > 200)
    return res.status(400).json({ error: "invalide text" });
  const note = { id: notes.length + 1, text };
  notes.push(note);
  res.status(201).json(note);
});
module.exports = app;
