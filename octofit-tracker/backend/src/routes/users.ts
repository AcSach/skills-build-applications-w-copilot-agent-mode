import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ count: users.length, users });
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default router;
