import { Router } from 'express';
import { Workout } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ count: workouts.length, workouts });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
