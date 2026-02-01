# Deploying Flying Panda Visa Alerts

This repository is prepared for:

- Backend → Render (service in `backend`)
- Frontend → Netlify (Vite app in `frontend/client`)

Quick steps

1. Commit and push these changes to your GitHub repository (e.g., `main` branch).

2. Render (Backend)
   - Go to https://render.com and create a new Web Service.
   - Connect your GitHub repo and choose the `main` branch.
   - Render will detect `render.yaml` and create the service defined there.
   - If asked for build/start commands, use:

     - Build command: `cd backend && npm install`
     - Start command: `cd backend && npm start`

   - Render provides the `PORT` environment variable automatically.

3. Netlify (Frontend)
   - Go to https://app.netlify.com and select "New site from Git".
   - Connect your GitHub repo and choose the `main` branch.
   - Netlify will use `netlify.toml` to build the site. If prompted, use:

     - Base directory: `frontend/client`
     - Build command: `npm run build`
     - Publish directory: `dist`

4. Environment / CORS
   - If the frontend calls the backend API, update the API base URL in the frontend
     to point to the Render service URL (set in Render dashboard).
   - Ensure CORS in the backend allows the Netlify domain, or configure a proxy/local env for development.

Notes
- The backend now reads `PORT` from the environment (see `backend/server.js`).
- `backend/package.json` added to let Render install and start the server.
- Adjust `render.yaml` and `netlify.toml` if you use a different branch or region.

Set `VITE_API_BASE` on Netlify

- In the Netlify UI: Site settings → Build & deploy → Environment → Add variable
  - Key: `VITE_API_BASE`
  - Value: `https://your-backend-service.onrender.com` (replace with your Render URL)

- Alternatively, using Netlify CLI:

```bash
# login first: netlify login
# set env var for a site by site id or site name
netlify env:set VITE_API_BASE https://your-backend-service.onrender.com --site <your-site-id>
```

- Note: Netlify's UI-provided environment variables are used during the build. Using `.env.production` is useful for local production builds, but Netlify overrides env vars with values set in the site settings.