# Scribe AI · Physician Dashboard (Frontend)

React + Vite frontend for the Scribe AI clinical documentation app. Deep charcoal theme, neon mint accents, glassmorphism, and WCAG‑friendly contrast.

## Run end‑to‑end (backend + frontend)

**Terminal 1 – backend (Flask, port 5000):**
```bash
cd "c:\Users\nisha\OneDrive\Desktop\vs code"
python -m backend.app
```

**Terminal 2 – frontend (Vite, port 5173):**
```bash
cd "c:\Users\nisha\OneDrive\Desktop\vs code\frontend"
npm install
npm run dev
```

Then open **http://localhost:5173**.

- **Dashboard:** Today’s schedule, daily progress ring, **Start Session**.
- **Session:** Upload audio or record → **Review & generate note** → processing → **Note Review**.
- **Note Review:** SOAP note + Evidence pane, **Sync to EHR**, Privacy toggle.

API calls go to `http://127.0.0.1:5000` (override with `VITE_API_URL`). Use **Upload audio** with MP3/WAV for best compatibility with the backend.

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – serve production build locally
