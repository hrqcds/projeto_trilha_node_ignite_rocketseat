import express from "express";
import "reflect-metadata";
import "./database";
import "./shared/container";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json";
import { routes } from "./routes";

const app = express();

app.use(express.json());

// Rota do swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(routes);

app.listen(4444, () => {
  console.log("Server is running");
  console.log("Rodando em: http://localhost:4444");
});
