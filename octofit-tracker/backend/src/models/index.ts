import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gradeLevel: { type: String, required: true },
    favoriteActivity: { type: String, required: true },
    team: { type: String, default: 'Unassigned' }
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    school: { type: String, default: 'Mergington High' },
    points: { type: Number, default: 0 },
    members: [{ type: String }]
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, required: true }
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
