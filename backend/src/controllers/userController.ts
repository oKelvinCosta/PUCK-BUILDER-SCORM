import * as express from 'express';
type Request = express.Request;
type Response = express.Response;

import User from "../models/User.ts";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

// export const deleteUser = async (req: Request, res: Response) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// };