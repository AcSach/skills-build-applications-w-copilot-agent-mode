import { Router } from 'express';
import { Team } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ count: teams.length, teams });
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

export default router;
