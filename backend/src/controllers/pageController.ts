import * as express from 'express';
import mongoose from "mongoose";

import Page from "../models/Page.ts";

type Request = express.Request;
type Response = express.Response;

export const createPage = async (req: Request, res: Response) => {
  try {
    const page = await Page.create(req.body);
    return res.status(201).json(page);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

// GET /pages?userId=123
// Returns pages for a specific user
export const getPagesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    const userObjectId = new mongoose.Types.ObjectId(userId as string);
    // Don't return puckData field to save bandwidth
    const pages = await Page.find({userId: userObjectId}).select('_id title slug cover updatedAt createdAt userId groupId');
    return res.json(pages);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

// GET /pages/group/:groupId  
export const getPagesByGroupId = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const groupObjectId = new mongoose.Types.ObjectId(groupId as string);
    const pages = await Page.find({ groupId: groupObjectId })
      .select('_id title slug cover updatedAt createdAt userId groupId')
      .sort({ updatedAt: -1 });
    return res.json(pages);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

// GET /pages/ungrouped?userId=123
// Returns pages without groupId for a specific user
export const getUngroupedPagesByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const userObjectId = new mongoose.Types.ObjectId(userId as string);

    // Find pages where groupId is null, undefined, or doesn't exist
    const pages = await Page.find({ 
      userId: userObjectId,
      $or: [
        { groupId: null },
        { groupId: undefined },
        { groupId: { $exists: false } }
      ]
    })
    .select('_id title slug cover updatedAt createdAt userId groupId')
    .sort({ updatedAt: -1 });
    
    return res.json(pages);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

// GET /pages/:id
// Returns a single page by ID
// For heavy content loading, use this endpoint
export const getPageById = async (req: Request, res: Response) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    return res.json(page);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { puckData } = req.body;
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { puckData, updatedAt: new Date() },
      { new: true }
    );
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    return res.json(page);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};