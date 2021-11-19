import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import "./database";
import "./shared/container";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

// Rota do swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(4444, () => {
  console.log("Server is running");
  console.log("Rodando em: http://localhost:4444");
});
