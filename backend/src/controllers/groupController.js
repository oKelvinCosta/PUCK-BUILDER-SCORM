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
export const getGroups = async (req, res) => {
  try {
    const { userId } = req.query;
    // O banco usa 'usersId'
    const query = userId ? { usersId: userId } : {};
    const groups = await Group.find(query);
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