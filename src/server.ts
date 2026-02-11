import express, { type Request, type Response } from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server lancé sur http://localhost:${port}`);
});
