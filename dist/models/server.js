import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth";
import { dbConnection } from "../database/config";
import ordersRoutes from "../routes/orders";
import issuesRoutes from "../routes/issues";
export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/auth";
        this.ordersPath = "/orders";
        this.issuesPath = "/issues";
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes);
        this.app.use(this.issuesPath, issuesRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en puerto ${this.port}`);
        });
    }
}
