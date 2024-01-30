import { rootRoute as rootRoute } from ".";
import { adminRoute } from "../pages/Admin/router";
import { loginRoute } from "../pages/Login/router";

export const routeTree = rootRoute.addChildren([
    loginRoute,
    adminRoute,

    // productRoute,
    // adminRoute.addChildren([
    //     productRoute
    // ])
])
