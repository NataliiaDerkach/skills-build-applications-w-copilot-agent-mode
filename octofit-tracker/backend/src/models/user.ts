import mongoose from 'mongoose';

export interface User {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  teamId?: string;
  joinedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    teamId: { type: String },
    joinedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>('User', userSchema);
