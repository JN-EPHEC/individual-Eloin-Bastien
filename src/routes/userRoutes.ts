import { Router, type Request, type Response } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { nom, prenom } = req.body;
  const newUser = await User.create({ nom, prenom });
  res.status(201).json(newUser);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await User.destroy({ where: { id } });
  res.status(204).send();
});

export default router;
