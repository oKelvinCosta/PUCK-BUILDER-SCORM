import express from "express";
import {
    createGroup,
    deleteGroup,
    getGroupById,
    getGroups,
    updateGroup
} from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

export default router;