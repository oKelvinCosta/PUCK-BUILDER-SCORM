import express from "express";
import { getUserById, getUsers, updateUser } from "../controllers/userController.ts";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.ts";

const router = express.Router();

router.get("/", verifyFirebaseToken, getUsers);
router.get("/:id", verifyFirebaseToken, getUserById);
router.put("/:id", verifyFirebaseToken, updateUser);

// Rota de criação (POST "/") foi removida.
// Novos usuários só são criados via /api/auth/sync (ver authController.syncUser).

export default router;