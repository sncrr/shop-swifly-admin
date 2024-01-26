import { Paths } from "../../constants"
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";

const basePath = Paths.PRODUCT;

export const ProductRoutes = [
    {
        path: `${basePath}/`,
        element: ProductList
    },
    {
        path: `${basePath}/${Paths.CREATE}`,
        element: ProductForm
    },
    {
        path: `${basePath}/${Paths.EDIT}`,
        element: ProductForm
    },
]