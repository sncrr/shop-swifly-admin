import { Paths } from "../../constants"
// import { ProductForm } from "./ProductForm";
// import { ProductList } from "./ProductList";

import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router';
// import { rootRoute } from '../../root';
import Product from ".";
import { adminRoute } from "../Admin/router";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";

//@ts-ignore
const indexRoute = createFileRoute('/products')({
    component: Product,
})

//@ts-ignore
const ListRoute:any = createFileRoute('/')({
    component: ProductList,
})
.update({
    path: '/',
    getParentRoute: () => indexRoute,
} as any)

//@ts-ignore
const AddRoute:any = createLazyFileRoute('/add')({
    component: ProductForm,
})

//@ts-ignore
const EditRoute:any = createLazyFileRoute('/edit/:id')({
    component: ProductList,
})

export const productRoute: any = indexRoute.addChildren([
    ListRoute,
    // AddRoute,
    // EditRoute
]).update({
    path: '/products',
    getParentRoute: () => adminRoute,
} as any)


// const basePath = Paths.PRODUCT;

// export const ProductRoutes = [
//     {
//         path: `${basePath}/`,
//         element: ProductList
//     },
//     {
//         path: `${basePath}/${Paths.CREATE}`,
//         element: ProductForm
//     },
//     {
//         path: `${basePath}/${Paths.EDIT}`,
//         element: ProductForm
//     },
// ]