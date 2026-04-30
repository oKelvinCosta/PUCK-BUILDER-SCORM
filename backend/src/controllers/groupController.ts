import * as express from 'express';
type Request = express.Request;
type Response = express.Response;

import mongoose from "mongoose";
import Group from "../models/Group.ts";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET /groups?userId=123
export const getGroupsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    const userObjectId = new mongoose.Types.ObjectId(userId as string);
    const groups = await Group.find({ userId: userObjectId });
    res.json(groups);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET /groups/abc123
export const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET /groups-with-pages?userId=123
export const getGroupsWithPages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'userId is required and must be a string' });
    }
    
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    const data = await Group.aggregate([
      {
        $match: {
          userId: userObjectId
        }
      },
      {
        $lookup: {
          from: 'pages',
          let: { groupId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$groupId', '$$groupId'] }
              }
            },
            {
              $project: {
                title: 1,
                cover: 1,
                slug: 1,
                order: 1,
                updatedAt: 1
              }
            },
            {
              $sort: { order: 1 }
            }
          ],
          as: 'pages'
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: 50
      }
    ]);
 
    res.json(data);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    res.json(group);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    res.json({ success: true });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};