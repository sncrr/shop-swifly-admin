import { Paths } from "../../constants"
import { CategoryForm } from "./CategoryForm"
import CategoryList from "./CategoryList"

const basePath = Paths.CATEGORY;

export const CategoryRoutes = [
    {
        path: `${basePath}/`,
        element: CategoryList
    },
    {
        path: `${basePath}/${Paths.CREATE}`,
        element: CategoryForm
    },
    {
        path: `${basePath}/${Paths.EDIT}`,
        element: CategoryForm
    },
]