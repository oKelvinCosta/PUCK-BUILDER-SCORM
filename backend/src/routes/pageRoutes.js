import express from "express";
import {
  createPage,
  deletePage,
  getPageById,
  getPagesByGroupId,
  getPagesByUserId,
  getUngroupedPagesByUserId,
  updatePage
} from "../controllers/pageController.js";

const router = express.Router();

// the order of routes matters
// more specific routes should be defined before general ones
router.post("/", createPage);
router.get("/", getPagesByUserId);
router.get("/ungrouped", getUngroupedPagesByUserId);
router.get("/group/:groupId", getPagesByGroupId);
router.get("/:id", getPageById);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;