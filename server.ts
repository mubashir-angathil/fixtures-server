import App from "./app";
import IndexRoute from "./src/routes/index.routes";
import AuthRoute from "./src/routes/auth.routes";
import AdminRoute from "./src/routes/admin.routes";
import DataRoute from "./src/routes/data.routes";

class Server extends App {
    constructor() {
        super([new AuthRoute(), new IndexRoute(), new AdminRoute(), new DataRoute()]);
        this.listen();
    }
}

new Server();
