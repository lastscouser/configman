import express, { Request, Response } from "express";

const router: express.Router = express.Router();

router.get("/home", async (req: Request, res: Response) => {
  res.send(`Configman Rocks!!!`);
});

export default router;
