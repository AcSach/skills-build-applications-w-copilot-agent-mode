import { Router } from 'express';
import { Activity } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ count: activities.length, activities });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

export default router;
