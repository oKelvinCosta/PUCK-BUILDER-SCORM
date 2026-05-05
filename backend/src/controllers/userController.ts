import * as express from 'express';
type Request = express.Request;
type Response = express.Response;

import User from "../models/User.ts";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err: unknown) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err: unknown) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err: unknown) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err: unknown) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

// export const deleteUser = async (req: Request, res: Response) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// };