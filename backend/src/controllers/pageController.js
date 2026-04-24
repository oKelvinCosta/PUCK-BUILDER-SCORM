import Page from "../models/Page.js";

export const createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /pages?userId=123
// Returns pages for a specific user
export const getPagesByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Don't return puckData field to save bandwidth
    const pages = await Page.find({userId}).select('_id title slug cover updatedAt createdAt userId groupId');
    // Para debug: descomente para ver se está usando índice
    // const explanation = await Page.find({userId}).explain('executionStats');
    // console.log('explanation', explanation.executionStats);
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /pages/group/:groupId  
export const getPagesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;
    const pages = await Page.find({ groupId })
      .select('_id title slug cover updatedAt createdAt userId groupId')
      .sort({ updatedAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /pages/ungrouped?userId=123
// Returns pages without groupId for a specific user
export const getUngroupedPagesByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Find pages where groupId is null, undefined, or doesn't exist
    const pages = await Page.find({ 
      userId,
      $or: [
        { groupId: null },
        { groupId: undefined },
        { groupId: { $exists: false } }
      ]
    })
    .select('_id title slug cover updatedAt createdAt userId groupId')
    .sort({ updatedAt: -1 });
    
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /pages/:id
// Returns a single page by ID
// For heavy content loading, use this endpoint
export const getPageById = async (req, res) => {
  const page = await Page.findById(req.params.id);
  res.json(page);
};

// export const getPagesByGroupId = async (req, res) => {
//   try {
//     const { groupId } = req.params;
    
//     const pages = await Page.find({ groupId })
//       .select('_id title cover updatedAt') // Select only necessary fields
//       .sort({ updatedAt: -1 }); // Most recent first
    
//     res.json(pages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const updatePage = async (req, res) => {
  const { puckData } = req.body;
  const page = await Page.findByIdAndUpdate(
    req.params.id,
    { puckData, updatedAt: new Date() },
    { new: true }
  );
  res.json(page);
};

export const deletePage = async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};