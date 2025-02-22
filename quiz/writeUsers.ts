import express from 'express';
import { Router } from 'express';
import { UserRequest } from './types';
import { promises as fsPromises } from 'fs';
import path from 'path';

const writeUsersRouter = Router();
const dataFile = '../data/users.json';

writeUsersRouter.use(express.json());

// Add new user
writeUsersRouter.post('/adduser', async (req: UserRequest, res) => {
  try {
    const newUser = req.body;
    const users = [...req.users!, newUser];
    
    await fsPromises.writeFile(
      path.resolve(__dirname, dataFile),
      JSON.stringify(users)
    );
    
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

export default writeUsersRouter;
