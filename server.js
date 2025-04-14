const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const MOOD_FILE = "./moods.json";


app.get("/api/moods", (req, res) => {
  const moods = JSON.parse(fs.readFileSync(MOOD_FILE));
  res.json(moods);
});


app.post("/api/moods", (req, res) => {
  const moods = JSON.parse(fs.readFileSync(MOOD_FILE));
  const newMood = {
    mood: req.body.mood,
    note: req.body.note,
    time: new Date().toISOString(),
  };
  moods.push(newMood);
  fs.writeFileSync(MOOD_FILE, JSON.stringify(moods, null, 2));
  res.status(201).json(newMood);
});

app.listen(PORT, () => {
  console.log(`🌈 Mood Journal radi na http://localhost:${PORT}`);
});
