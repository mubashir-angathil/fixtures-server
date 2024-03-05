import AdminServices from "./admin.services";
import AuthServices from "./auth.services";
import DataServices from "./data.services";
import IndexServices from "./index.services";
import ProductServices from "./product.services";
import UserServices from "./user.services";

export default {
    authServices: new AuthServices(),
    indexServices: new IndexServices(),
    productServices: new ProductServices(),
    dataServices: new DataServices(),
    userServices: new UserServices(),
    adminServices: new AdminServices()
};
