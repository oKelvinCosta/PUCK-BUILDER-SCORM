import Page from "../models/Page.js";

export const createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPages = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { usersId: userId } : {};
    const pages = await Page.find(query);
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPageById = async (req, res) => {
  const page = await Page.findById(req.params.id);
  res.json(page);
};

export const updatePage = async (req, res) => {
  const page = await Page.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(page);
};

export const deletePage = async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};