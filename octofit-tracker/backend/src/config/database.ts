import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  try {
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB database: ${uri}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}
