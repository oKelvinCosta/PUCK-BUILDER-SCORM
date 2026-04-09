import mongoose from "mongoose"; // TODO Instalar ESLINT para que dependencias faltantes sejam avisadas!
import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /groups?userId=123
export const getGroupsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const groups = await Group.find({userId});
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /groups/abc123
export const getGroupById = async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.json(group);
};

// GET /groups-with-pages?userId=123
export const getGroupsWithPages = async (req, res) => {
  try {
    const { userId } = req.query;
    
    const data = await Group.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGroup = async (req, res) => {
  const group = await Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(group);
};

export const deleteGroup = async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};