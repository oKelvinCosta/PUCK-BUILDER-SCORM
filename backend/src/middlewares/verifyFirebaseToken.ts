import type { NextFunction, Request, Response } from "express";
import { auth } from "../services/firebaseAdminService.ts";

export interface AuthenticatedRequest extends Request {
  firebaseUser?: {
    uid: string;
    email?: string;
    [key: string]: any;
  };
}

export async function verifyFirebaseToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token Firebase:", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}