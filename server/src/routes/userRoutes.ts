import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";

const router = Router();

/**
 *  @swagger
 *  /api/users:
 *  get:
 *    summary: Récupère la liste des utilisateurs
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Succès
 */

router.get("/", userController.getAllUsers);

/**
 *  @swagger
 *  /api/users/{id}:
 *  get:
 *    summary: Un utilisateur par ID
 *    tags: [Users]
 */

router.get("/:id", checkIdParam, userController.getUserById);

/**
 *  @swagger
 *  /api/users:
 *  post:
 *    summary: Ajouter un utilisateur
 *    tags: [Users]
 *    responses:
 *      201:
 *        description: Créé
 */
router.post("/", userController.createUser);

/**
 *  @swagger
 *  /api/users/{id}:
 *  put:
 *    summary: Modifier un utilisateur
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: Mis à jour
 */
router.put("/:id", checkIdParam, userController.updateUser);

/**
 *  @swagger
 *  /api/users/{id}:
 *    delete:
 *      summary: Supprimer un utilisateur
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        204:
 *          description: Supprimé
 */
router.delete("/:id", userController.deleteUser);

export default router;
