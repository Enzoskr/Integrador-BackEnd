import dotenv from "dotenv";
import { Server } from "./models/server";

dotenv.config();

const server = new Server();
server.listen();

server.app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
