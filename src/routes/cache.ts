import express, { Request, Response } from "express";
import { cache } from "../helper/cache";
import { jwt } from "../middleware/jwt";

const router: express.Router = express.Router();

router.get("/keys", [jwt], async (req: Request, res: Response) => {
  return res.send(cache.keys());
});

router.get("/stats", [jwt], async (req: Request, res: Response) => {
  return res.send(cache.getStats());
});

router.delete("/del/:key", [jwt], async (req: Request, res: Response) => {
  const num = cache.del(req.params.key);
  return res.send({ number: num });
});

router.delete("/flush", [jwt], async (req: Request, res: Response) => {
  cache.flushAll();
  return res.send({ message: "ok" });
});

router.get("/items/:key", [jwt], async (req: Request, res: Response) => {
  return res.send(cache.get(req.params.key));
});

router.get("/items/ttl/:key", [jwt], async (req: Request, res: Response) => {
  const ttl = cache.getTtl(req.params.key);
  return res.send({ message: ttl });
});

export default router;
