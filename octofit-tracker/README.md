# OctoFit Tracker

A modern multi-tier fitness tracking application built with React, Node.js/Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend application
└── backend/           # Node.js + Express + TypeScript backend
```

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB (v5.0+)

## Frontend Setup

**Location:** `octofit-tracker/frontend`

- **Framework:** React 19
- **Build Tool:** Vite
- **Port:** 5173

### Running the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup

**Location:** `octofit-tracker/backend`

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Port:** 8000

### Dependencies

- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **typescript** - Type safety
- **ts-node** - TypeScript execution for development

### Running the Backend

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:8000`

### Building the Backend

```bash
cd backend
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Production

```bash
cd backend
npm run start
```

## MongoDB Configuration

The backend connects to MongoDB at:
```
mongodb://localhost:27017/octofit-tracker
```

Ensure MongoDB is running locally before starting the backend.

## API Endpoints

- `GET /` - Returns API welcome message
- `GET /health` - Health check endpoint

## Development Workflow

1. **Frontend Development:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Backend Development:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Backend Build (TypeScript → JavaScript):**
   ```bash
   cd backend
   npm run build
   ```

## Ports Summary

| Service    | Port  |
|-----------|-------|
| Frontend  | 5173  |
| Backend   | 8000  |
| MongoDB   | 27017 |

## Configuration

### Backend Server Port
Edit `backend/src/server.ts` and modify the `PORT` constant to change the backend port.

### MongoDB Connection
Edit `backend/src/server.ts` and modify the `MONGODB_URI` to change the database connection string.

### Frontend Server Port
Edit `backend/frontend/vite.config.js` and modify the `server.port` to change the frontend port.
