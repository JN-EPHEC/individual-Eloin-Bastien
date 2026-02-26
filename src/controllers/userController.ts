import type { Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body;
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la creation" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await User.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
