import express from "express";
import { apiRouter } from "./routes/api.js";

export const app = express();
app.use(express.json());
app.use("/api", apiRouter);
