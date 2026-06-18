import express from "express";
import { getMe, syncUser } from "../controllers/authController.ts";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.ts";

const router = express.Router();

router.post("/sync", verifyFirebaseToken, syncUser);
router.get("/me", verifyFirebaseToken, getMe);

export default router;