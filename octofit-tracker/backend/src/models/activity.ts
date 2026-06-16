import mongoose from 'mongoose';

export interface Activity {
  userId: string;
  teamId?: string;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<Activity>(
  {
    userId: { type: String, required: true },
    teamId: { type: String },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number, required: true },
    date: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
