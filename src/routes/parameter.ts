import express, { Request, Response } from "express";
import { requestValidator } from "../middleware/request-validator";

import { jwt } from "../middleware/jwt";
import { getAuth } from "../config/firebase";
import { ParameterDbManager } from "../database/parameter";
import {
  parameterCreationSchema,
  parameterUpdateSchema,
} from "../domain/validation/parameter";

const router: express.Router = express.Router();
const auth = getAuth();

router.get("/all", [jwt], async (req: Request, res: Response) => {
  const paramManager = new ParameterDbManager();
  const response = await paramManager.getAll();

  res.send(response);
});

router.get("/one/:id", [jwt], async (req: Request, res: Response) => {
  const { id } = req.params;
  const paramManager = new ParameterDbManager();
  const response = await paramManager.getById(id);

  res.send(response);
});

router.post(
  "/create",
  [jwt, requestValidator(parameterCreationSchema)],
  async (req: Request, res: Response) => {
    const paramManager = new ParameterDbManager();

    await paramManager.create({ ...req.body });

    res.send({ message: "Parameter has successfully been created." });
  }
);

router.put(
  "/update/:id",
  [jwt, requestValidator(parameterUpdateSchema)],
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const paramManager = new ParameterDbManager();
    await paramManager.update(id, { ...req.body });

    res.send({ message: "Parameter has successfully been updated." });
  }
);

router.delete("/delete/:id", [jwt], async (req: Request, res: Response) => {
  const { id } = req.params;
  const paramManager = new ParameterDbManager();
  await paramManager.delete(id);

  res.send({ message: "Parameter has successfully been deleted." });
});

export default router;
