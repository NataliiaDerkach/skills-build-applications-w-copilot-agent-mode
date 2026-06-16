import express from 'express';
import type { Express, Request, Response } from 'express';
import { connectDatabase, MONGODB_URI } from './config/database.js';
import { UserModel } from './models/user.js';
import { TeamModel } from './models/team.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { WorkoutModel } from './models/workout.js';

const app: Express = express();
const PORT = 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : `http://localhost:${PORT}/api`;

// Middleware
app.use(express.json());
app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// MongoDB Connection
connectDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiBaseUrl: API_BASE_URL,
    environment: CODESPACE_NAME ? 'codespaces' : 'local',
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// API routes
app.get('/api/users', async (req: Request, res: Response) => {
  const users = await UserModel.find({}).lean();
  res.json({ users });
});

app.get('/api/teams', async (req: Request, res: Response) => {
  const teams = await TeamModel.find({}).lean();
  res.json({ teams });
});

app.get('/api/activities', async (req: Request, res: Response) => {
  const activities = await ActivityModel.find({}).lean();
  res.json({ activities });
});

app.get('/api/leaderboard', async (req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find({}).sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts', async (req: Request, res: Response) => {
  const workouts = await WorkoutModel.find({}).lean();
  res.json({ workouts });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API base URL: ${API_BASE_URL}`);
});
