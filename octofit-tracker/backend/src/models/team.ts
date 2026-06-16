import mongoose from 'mongoose';

export interface Team {
  name: string;
  description: string;
  members: number;
  coach: string;
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<Team>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
    coach: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const TeamModel = mongoose.model<Team>('Team', teamSchema);
