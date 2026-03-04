import type { Request, Response, NextFunction } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    next(error);
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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const [rows] = await User.update(req.body, { where: { id } });

    if (rows === 0)
      return res.status(404).json({ error: "Pas d'utilisateur à modifier" });

    res.json({ message: "Utilisateur mis à jour !" });
  } catch (error) {
    next(error);
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
