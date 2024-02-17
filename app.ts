import { NODE_ENV, PORT } from "./src/configs/configs";
import { Routes } from "./src/configs/interfaces/routes.interface";
import prisma from "./src/prisma/prisma";
import express from "express"

class App {
    public app: express.Application;
    public port: number | null

    constructor(routes: Routes[], process: NodeJS.Process,) {
        this.app = express()
        this.port = PORT || 3000
        this.initializeRoutes(routes)
        this.initializeDatabase()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`ENV: ${NODE_ENV} `);
            console.info(`🚀 App listening on the port ${this.port}`);
        });
    }

    private async initializeDatabase() {
        try {
            await prisma.$connect();
            console.info('📚 Database Connected');
        } catch (error) {
            console.error(error);
            this.cleanUp();
        }
    }

    private async initializeRoutes(routers: Routes[]) {
        routers.forEach((route) => this.app.use(`${route.path}`, route.router))
    }

    private cleanUp() {
        prisma.$disconnect();
        console.info('😭 Connection closing...');
        process.exit(0);
    }
}

export default App