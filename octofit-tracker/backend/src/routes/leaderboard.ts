import { Router } from 'express';
import { Leaderboard } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).lean();
  res.json({ count: leaderboard.length, leaderboard });
});

export default router;
