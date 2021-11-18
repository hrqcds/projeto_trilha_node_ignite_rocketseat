import express from "express";
import "reflect-metadata";
import "./database";
import "./shared/container";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(4444, () => {
  console.log("Server is running");
  console.log("Rodando em: http://localhost:4444");
});
