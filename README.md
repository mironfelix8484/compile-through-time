# Compile Through Time

A REST API design exercise that finds historically available development environments for a selected date. It does not compile code or use virtualization, emulation, authentication, a database, or Docker.

## Run locally

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

The API runs at `http://localhost:3000` and Vite at `http://localhost:5173`. During development, Vite proxies `/api` to the backend.

## Commands

```bash
npm test
npm run build
```

## API

- `GET /api/health`
- `GET /api/environments?date=YYYY-MM-DD`

Availability dates are inclusive. Historical records live in `backend/src/data/environments.json`.
