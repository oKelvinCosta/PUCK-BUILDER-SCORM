import express from "express";
import {
    createPage,
    deletePage,
    getPageById,
    getPages,
    updatePage
} from "../controllers/pageController.js";

const router = express.Router();

router.post("/", createPage);
router.get("/", getPages);
router.get("/:id", getPageById);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;