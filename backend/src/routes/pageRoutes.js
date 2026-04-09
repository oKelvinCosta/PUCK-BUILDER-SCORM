import express from "express";
import {
    createPage,
    deletePage,
    getPageById,
    // getPagesByGroupId,
    getPagesByUserId,
    updatePage
} from "../controllers/pageController.js";

const router = express.Router();

router.post("/", createPage);
router.get("/", getPagesByUserId);
router.get("/:id", getPageById);
// router.get("/group/:groupId", getPagesByGroupId);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;