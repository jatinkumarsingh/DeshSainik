# Project Deployment TODO

## Fixes and Preparations
- [ ] Fix typo in my-app/src/App.jsx: Change 'setCatepgory' to 'setCategory'
- [ ] Create my-app/.env with VITE_API_BASE_URL placeholder
- [ ] Update backend/server.js to allow all origins for CORS
- [ ] Update backend/.env with placeholders for MONGODB_URI, JWT_SECRET, PORT
- [ ] Run linting and build checks for frontend and backend

## Deployment Steps
- [ ] Deploy frontend to Vercel
  - Push code to GitHub
  - Connect Vercel to GitHub repo
  - Set build settings: root directory 'my-app', build command 'npm run build', output directory 'dist'
  - Deploy
- [ ] Deploy backend to Render
  - Push backend code to GitHub (separate repo or same with subdirectory)
  - Connect Render to GitHub repo
  - Set build command: 'npm install'
  - Set start command: 'npm start'
  - Set environment variables: MONGODB_URI, JWT_SECRET, PORT
  - Deploy
- [ ] Update my-app/.env with deployed backend URL (e.g., VITE_API_BASE_URL=https://your-render-app.onrender.com)
- [ ] Redeploy frontend on Vercel if .env was updated
- [ ] Test the deployed app
