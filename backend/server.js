const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 8002;

// MongoDB connection with error handling
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  console.log('Please update your MongoDB credentials in the .env file');
  console.log('Server will continue running but authentication features will not work.');
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:8000',
      'http://localhost:4173',
      'https://desh-sainik.vercel.app'
    ];

    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());

// Jobs database
const jobsDatabase = [
  { id: 1, title: "Army GD Rally", region: "North", category: "GD", date: "2025-12-10" },
  { id: 2, title: "Air Force Clerk Exam", region: "South", category: "Clerk", date: "2025-12-15" },
  { id: 3, title: "Navy Technical Entry", region: "West", category: "Technical", date: "2026-01-05" },
  { id: 4, title: "Army Nursing Recruitment", region: "East", category: "Nursing", date: "2025-12-25" },
  { id: 5, title: "BSF Constable Recruitment", region: "North", category: "Constable", date: "2025-12-12" },
  { id: 6, title: "CRPF Head Constable Admit Card", region: "West", category: "Admit Card", date: "2025-12-18" },
  { id: 7, title: "Indian Navy SSR Result", region: "South", category: "Result", date: "2025-12-20" },
  { id: 8, title: "Indian Army Clerk Admit Card", region: "East", category: "Admit Card", date: "2025-12-22" },
  { id: 9, title: "Air Force Group X Recruitment", region: "West", category: "Group X", date: "2025-12-23" },
  { id: 10, title: "Army Technical Result", region: "North", category: "Result", date: "2025-12-24" },
  { id: 11, title: "Navy MR Admit Card", region: "South", category: "Admit Card", date: "2025-12-26" },
  { id: 12, title: "SSC GD Constable Result", region: "North", category: "Result", date: "2025-12-27" },
  { id: 13, title: "Territorial Army Officer Recruitment", region: "West", category: "Officer", date: "2025-12-28" },
  { id: 14, title: "Indian Coast Guard Navik Admit Card", region: "North", category: "Admit Card", date: "2025-12-29" },
  { id: 15, title: "Army Nursing Result", region: "East", category: "Result", date: "2025-12-30" },
  { id: 16, title: "CISF Constable Recruitment", region: "East", category: "Constable", date: "2026-01-01" },
  { id: 17, title: "ITBP Head Constable Admit Card", region: "West", category: "Admit Card", date: "2026-01-02" },
  { id: 18, title: "Indian Army Technical Recruitment", region: "North", category: "Technical", date: "2026-01-03" },
  { id: 19, title: "Navy SSR Admit Card", region: "South", category: "Admit Card", date: "2026-01-04" },
  { id: 20, title: "Air Force Group Y Result", region: "North", category: "Result", date: "2026-01-05" },
  { id: 21, title: "Army Clerk Result", region: "West", category: "Result", date: "2026-01-06" },
  { id: 22, title: "Indian Navy MR Recruitment", region: "East", category: "MR", date: "2026-01-07" },
  { id: 23, title: "Army Nursing Admit Card", region: "South", category: "Admit Card", date: "2026-01-08" },
  { id: 24, title: "BSF Head Constable Result", region: "North", category: "Result", date: "2026-01-09" },
  { id: 25, title: "CRPF Constable Recruitment", region: "West", category: "Constable", date: "2026-01-10" },
  { id: 26, title: "Indian Army GD Admit Card", region: "North", category: "Admit Card", date: "2026-01-11" },
  { id: 27, title: "Navy SSR Recruitment", region: "South", category: "SSR", date: "2026-01-12" },
  { id: 28, title: "Air Force Clerk Admit Card", region: "North", category: "Admit Card", date: "2026-01-13" },
  { id: 29, title: "Army Technical Admit Card", region: "West", category: "Admit Card", date: "2026-01-14" },
  { id: 30, title: "Indian Coast Guard Yantrik Result", region: "East", category: "Result", date: "2026-01-15" },
];

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRoutes);

// Search endpoint for job listings (legacy support)
app.post('/api/search', (req, res) => {
  const { query, region, category } = req.body;

  let results = jobsDatabase;

  if (query && query.trim()) {
    results = results.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (region && region !== "All") {
    results = results.filter(item => item.region === region);
  }

  if (category && category !== "All") {
    results = results.filter(item => item.category === category);
  }

  res.json({ 
    success: true, 
    data: results, 
    count: results.length
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// migrateUsers(); // Disabled for local search API

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
