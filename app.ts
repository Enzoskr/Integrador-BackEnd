import dotenv from "dotenv";
import { Server } from "./models/server";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express from "express";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new Server();
server.listen();

server.app.use(express.static(path.join(__dirname, "../public")));

server.app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
