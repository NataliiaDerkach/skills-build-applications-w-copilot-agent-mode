import mongoose from 'mongoose';

export interface Workout {
  title: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  focus: string;
  equipmentNeeded: string[];
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<Workout>(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    focus: { type: String, required: true },
    equipmentNeeded: { type: [String], required: true, default: [] },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);
