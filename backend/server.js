const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Static assets (thumbnails, videos)
app.use('/thumbs', express.static(path.join(__dirname, 'thumbs')));

// In-memory demo data (you can replace this with a DB)
const movies = [
  { id: 1, title: "Stranger Things", year: 2016, synopsis: "Sci-fi mystery", thumb: "/thumbs/stranger.jpg.jpg" },
  { id: 2, title: "Money Heist", year: 2017, synopsis: "Heist drama", thumb: "/thumbs/money.jpg.jpg" },
  { id: 3, title: "Squid Game", year: 2021, synopsis: "Survival drama", thumb: "/thumbs/squid.jpg.jpg" }
];

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.get('/api/movies', (_req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const m = movies.find(x => x.id === Number(req.params.id));
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json(m);
});

// Simple search
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const out = movies.filter(m => m.title.toLowerCase().includes(q));
  res.json(out);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));

