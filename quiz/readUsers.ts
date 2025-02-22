import { Router } from 'express';
import { UserRequest } from './types';
import { promises as fsPromises } from 'fs';
import path from 'path';

const readUsersRouter = Router();
const dataFile = '../data/users.json';

readUsersRouter.use(async (req: UserRequest, res, next) => {
  try {
    const data = await fsPromises.readFile(path.resolve(__dirname, dataFile));
    req.users = JSON.parse(data.toString());
    next();
  } catch (err) {
    res.status(500).json({ error: 'Failed to load user data' });
  }
});

// Get all usernames
readUsersRouter.get('/usernames', (req: UserRequest, res) => {
  res.json(req.users?.map(user => ({
    id: user.id,
    username: user.username
  })));
});

// Get user by ID
readUsersRouter.get('/users/:id', (req: UserRequest, res) => {
  const user = req.users?.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

export default readUsersRouter;

