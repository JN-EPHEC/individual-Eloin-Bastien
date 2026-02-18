import { Router, type Request, type Response } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;

    if (!nom || !prenom || !email) {
      return res
        .status(400)
        .json({ error: "nom, prenom et email sont requis" });
    }

    const newUser = await User.create({ nom, prenom, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await User.destroy({ where: { id } });
  res.status(204).send();
});

export default router;
