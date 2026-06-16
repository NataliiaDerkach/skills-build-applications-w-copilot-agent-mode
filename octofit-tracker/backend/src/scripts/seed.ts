import mongoose from 'mongoose';
import { UserModel } from '../models/user.js';
import { TeamModel } from '../models/team.js';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { WorkoutModel } from '../models/workout.js';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    name: 'Avery Jones',
    email: 'avery.jones@example.com',
    role: 'member',
    teamId: 't1',
    joinedAt: new Date('2026-01-12T08:00:00Z'),
  },
  {
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    role: 'coach',
    teamId: 't1',
    joinedAt: new Date('2026-02-04T10:30:00Z'),
  },
  {
    name: 'Ethan Brooks',
    email: 'ethan.brooks@example.com',
    role: 'member',
    teamId: 't2',
    joinedAt: new Date('2026-03-08T07:45:00Z'),
  },
];

const teams = [
  {
    name: 'Midnight Runners',
    description: 'A fast-paced group focused on evening cardio and endurance races.',
    members: 12,
    coach: 'Maya Patel',
    createdAt: new Date('2025-11-20T09:00:00Z'),
  },
  {
    name: 'Sunrise Sprinters',
    description: 'A community team training for interval sprints and morning energy.',
    members: 8,
    coach: 'Jordan Lee',
    createdAt: new Date('2025-12-12T06:30:00Z'),
  },
];

const activities = [
  {
    userId: 'u1',
    teamId: 't1',
    type: 'run',
    duration: 42,
    distance: 8.2,
    calories: 630,
    date: new Date('2026-06-01T18:20:00Z'),
  },
  {
    userId: 'u2',
    teamId: 't1',
    type: 'yoga',
    duration: 60,
    calories: 245,
    date: new Date('2026-06-02T07:00:00Z'),
  },
  {
    userId: 'u3',
    teamId: 't2',
    type: 'cycle',
    duration: 55,
    distance: 18.4,
    calories: 520,
    date: new Date('2026-06-03T16:00:00Z'),
  },
];

const leaderboardEntries = [
  {
    userId: 'u1',
    userName: 'Avery Jones',
    totalPoints: 1420,
    rank: 1,
    lastUpdated: new Date('2026-06-04T12:00:00Z'),
  },
  {
    userId: 'u2',
    userName: 'Maya Patel',
    totalPoints: 1345,
    rank: 2,
    lastUpdated: new Date('2026-06-04T12:00:00Z'),
  },
  {
    userId: 'u3',
    userName: 'Ethan Brooks',
    totalPoints: 1210,
    rank: 3,
    lastUpdated: new Date('2026-06-04T12:00:00Z'),
  },
];

const workouts = [
  {
    title: 'Full Body Strength',
    duration: 30,
    difficulty: 'medium',
    focus: 'strength',
    equipmentNeeded: ['dumbbells', 'mat'],
    createdAt: new Date('2026-05-15T09:00:00Z'),
  },
  {
    title: 'Cardio Blast',
    duration: 25,
    difficulty: 'hard',
    focus: 'cardio',
    equipmentNeeded: ['treadmill'],
    createdAt: new Date('2026-05-18T08:00:00Z'),
  },
  {
    title: 'Recovery Stretch',
    duration: 20,
    difficulty: 'easy',
    focus: 'flexibility',
    equipmentNeeded: ['mat'],
    createdAt: new Date('2026-05-20T08:00:00Z'),
  },
];

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const createdUsers = await UserModel.insertMany(users);
  const createdTeams = await TeamModel.insertMany(teams);
  const createdActivities = await ActivityModel.insertMany(activities);
  const createdLeaderboard = await LeaderboardModel.insertMany(leaderboardEntries);
  const createdWorkouts = await WorkoutModel.insertMany(workouts);

  console.log(`Inserted ${createdUsers.length} users`);
  console.log(`Inserted ${createdTeams.length} teams`);
  console.log(`Inserted ${createdActivities.length} activities`);
  console.log(`Inserted ${createdLeaderboard.length} leaderboard entries`);
  console.log(`Inserted ${createdWorkouts.length} workouts`);

  await mongoose.disconnect();
  console.log('Seeding complete and disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
