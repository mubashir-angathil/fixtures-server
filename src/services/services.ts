import AuthServices from "./auth.services";
import DataServices from "./data.services";
import IndexServices from "./index.services";
import ProductServices from "./product.services";

export default {
    authServices: new AuthServices(),
    indexServices: new IndexServices(),
    productServices: new ProductServices(),
    dataServices: new DataServices()
};
