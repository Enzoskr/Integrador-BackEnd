import dotenv from "dotenv";
import { Server } from "./models/server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = new Server();
server.listen();
server.app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
});
