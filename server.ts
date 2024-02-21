import App from "./app";
import IndexRoute from "./src/routes/index.routes";
import AuthRoute from "./src/routes/auth.routes";

class Server extends App {
    constructor() {
        super([new AuthRoute(), new IndexRoute()]);
        this.listen();
    }
}

new Server();
