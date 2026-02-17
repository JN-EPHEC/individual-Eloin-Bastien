import express, { type Request, type Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API TypeScript!");
});

app.get("/api/data", (req: Request, res: Response) => {
  const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
  ];
  res.json(etudiants);
});

app.get("/api/hello/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  res.json({
    message: `Bonjour ${name}`,
    time: new Date().toISOString(),
  });
});

app.use("/api/users", userRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données établie.");

    sequelize.sync().then(() => {
      console.log("La base de données a été synchronisée avec succès !");
    });

    app.listen(port, () => {
      console.log(`Server lancé sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erreur de connexion / synchronisation DB :", error);
  }
}

start();
