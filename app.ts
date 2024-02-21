import { NODE_ENV, PORT } from "./src/configs/configs";
import { Routes } from "./src/configs/interfaces/routes.interface";
import prisma from "./src/prisma/prisma";
import express from "express";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import ErrorHandlerMiddleWare from "./src/middlewares/errorHandler.middlewares";
import { consola } from "consola";
class App {
    public app: express.Application;
    public port: number | null;
    private errorHandlerMiddleware = new ErrorHandlerMiddleWare();

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT || 3000;
        this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandler();
    }

    public listen() {
        this.app.listen(this.port, () => {
            consola.info({ message: `ENV: ${NODE_ENV} `, badge: true });
            consola.success({
                message: `App listening on the port ${this.port}`,
                badge: true,
            });
        });
    }

    private async initializeMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(compression());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async initializeDatabase() {
        try {
            await prisma.$connect();
            consola.success({ message: "Database Connected", badge: true });
        } catch (error) {
            consola.error({ message: error, badge: true });
            this.cleanUp();
        }
    }

    private async initializeRoutes(routers: Routes[]) {
        routers.forEach((route) => this.app.use(`${route.path}`, route.router));
    }

    private async initializeErrorHandler() {
        this.app.use(this.errorHandlerMiddleware.errorHandler);
    }

    private cleanUp() {
        prisma.$disconnect();
        consola.info({ message: "😭 Connection closing...", badge: true });
        process.exit(0);
    }
}

export default App;
