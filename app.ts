import dotenv from "dotenv";
import { Server } from "./models/server";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new Server();

server.app.use(express.static(path.join(process.cwd(), "public")));

// 👇 Ruta raíz
server.app.get("/", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

export default server.app;
