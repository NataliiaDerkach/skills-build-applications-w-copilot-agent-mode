import mongoose from 'mongoose';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalPoints: number;
  rank: number;
  lastUpdated: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardEntry>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    totalPoints: { type: Number, required: true },
    rank: { type: Number, required: true },
    lastUpdated: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const LeaderboardModel = mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
