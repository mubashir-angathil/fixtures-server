import App from "./app";
import IndexRoute from "./src/routes/index.routes";
import AuthRoute from "./src/routes/auth.routes";
import AdminRoute from "./src/routes/admin.routes";
import DataRoute from "./src/routes/data.routes";
import UserRoute from "./src/routes/user.routes";

class Server extends App {
    constructor() {
        super([new AuthRoute(), new IndexRoute(), new AdminRoute(), new DataRoute(), new UserRoute()]);
        this.listen();
    }
}

new Server();
