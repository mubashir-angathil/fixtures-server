import { Application } from "express";
import App from "./app"
import IndexRoute from "./src/routes/index.routes";

class Server extends App {
    constructor() {
        super([new IndexRoute()], process);
        this.listen()
    }
}

new Server()