import express, { Request, Response } from "express";
import { requestValidator } from "../middleware/request-validator";
import {
  loginSchema,
  registerSchema,
  resetSchema,
} from "../domain/validation/user";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "../config/firebase";

const router: express.Router = express.Router();
const auth = getAuth();

router.post(
  "/register",
  [requestValidator(registerSchema)],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser!);

    res.send({ message: "User verification e-mail is successfully sent." });
  }
);

router.post(
  "/login",
  [requestValidator(loginSchema)],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await signInWithEmailAndPassword(auth, email, password);
    const token = await response.user.getIdToken();

    res.send({ message: "User is successfully logged in.", token: token });
  }
);

router.post(
  "/reset-password",
  [requestValidator(resetSchema)],
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await sendPasswordResetEmail(auth, email);

    res.send({ message: "User password reset email is successfully sent." });
  }
);

router.post("/logout", async (req: Request, res: Response) => {
  res.send({ message: "User successfully logged out." });
});

export default router;
