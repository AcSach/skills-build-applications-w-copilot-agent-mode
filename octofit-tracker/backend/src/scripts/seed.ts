import { connectToDatabase } from '../config/database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

async function seed(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectToDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava.chen@mergington.edu',
        gradeLevel: '10',
        favoriteActivity: 'Running',
        team: 'Rocket'
      },
      {
        name: 'Ben Ortiz',
        email: 'ben.ortiz@mergington.edu',
        gradeLevel: '11',
        favoriteActivity: 'Strength Training',
        team: 'Storm'
      },
      {
        name: 'Mina Patel',
        email: 'mina.patel@mergington.edu',
        gradeLevel: '9',
        favoriteActivity: 'Yoga',
        team: 'Rocket'
      }
    ]);

    await Team.insertMany([
      {
        name: 'Rocket',
        school: 'Mergington High',
        points: 1320,
        members: users.slice(0, 2).map((user) => user.name)
      },
      {
        name: 'Storm',
        school: 'Mergington High',
        points: 1180,
        members: [users[1].name]
      }
    ]);

    await Activity.insertMany([
      {
        userName: 'Ava Chen',
        type: 'run',
        durationMinutes: 35,
        points: 140,
        date: new Date('2026-07-10')
      },
      {
        userName: 'Ben Ortiz',
        type: 'strength',
        durationMinutes: 45,
        points: 160,
        date: new Date('2026-07-11')
      },
      {
        userName: 'Mina Patel',
        type: 'yoga',
        durationMinutes: 30,
        points: 90,
        date: new Date('2026-07-12')
      }
    ]);

    await Leaderboard.insertMany([
      { name: 'Ava Chen', points: 1320, streak: 5, rank: 1 },
      { name: 'Ben Ortiz', points: 1180, streak: 3, rank: 2 },
      { name: 'Mina Patel', points: 1040, streak: 4, rank: 3 }
    ]);

    await Workout.insertMany([
      {
        name: 'Morning Mile Sprint',
        category: 'Cardio',
        difficulty: 'Moderate',
        durationMinutes: 20,
        description: 'A brisk run designed to build endurance and speed.'
      },
      {
        name: 'Core Strength Circuit',
        category: 'Strength',
        difficulty: 'Challenging',
        durationMinutes: 35,
        description: 'A quick circuit for core stability and upper body strength.'
      },
      {
        name: 'Stretch & Flow',
        category: 'Recovery',
        difficulty: 'Easy',
        durationMinutes: 25,
        description: 'A calm mobility routine that helps students recover after activity.'
      }
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Seeding failed', error);
    process.exitCode = 1;
  }
}

seed();
