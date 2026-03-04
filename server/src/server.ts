import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("public"));

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* app.get("/", (req: Request, res: Response) => {
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
*/

// Routes
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

// Gestion erreur 404 pour les routes non définies
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(
    `Route introuvable : ${req.method} ${req.originalUrl}`,
  );
  (error as any).status = 404;
  next(error);
});

app.use(errorHandler);

start();
