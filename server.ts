import App from "./app";
import IndexRoute from "./src/routes/index.routes";
import AuthRoute from "./src/routes/auth.routes";
import AdminRoute from "./src/routes/admin.routes";

class Server extends App {
    constructor() {
        super([new AuthRoute(), new IndexRoute(), new AdminRoute()]);
        this.listen();
    }
}

new Server();
