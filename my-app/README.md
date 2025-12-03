# DeshSainik Frontend

Frontend for the DeshSainik defence exam preparation platform. Built for aspirants preparing for Army, Navy, Air Force, and paramilitary exams.

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- React Router

## Setup

```bash
cd my-app
npm install
npm run dev
```

Runs on http://localhost:8000

## Features

- Course listings with search and filter
- Job notifications
- User authentication (signup/login)
- Control Hub (admin panel) for managing courses and jobs
- Background video on pages
- Infinite scroll course sliders

## Pages

- `/` - Home page with course sliders
- `/auth` - Login/Signup
- `/admin` - Control Hub (manage courses & jobs)

## Folder Structure
```
my-app/
├── src/
│   ├── components/
│   │   ├── StartJourney.jsx   # Main landing page
│   │   ├── AdminPanel.jsx     # Control Hub
│   │   ├── Auth.jsx           # Login/Signup
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── dik.mp4                # Background video
└── index.html
```

## Backend

Make sure the backend is running on port 8002. API calls are proxied via vite.config.js.
