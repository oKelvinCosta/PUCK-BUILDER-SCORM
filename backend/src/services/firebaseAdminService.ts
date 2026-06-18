import { cert, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../serviceAccountKey.json" with { type: "json" };

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(app);