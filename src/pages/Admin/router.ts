import { createFileRoute } from '@tanstack/react-router';
import { Paths } from '../../constants';
import { Admin } from '.';
import { rootRoute } from '../../root';
import { productRoute } from '../Product/router';

//@ts-ignore
const IndexRoute = createFileRoute(Paths.ADMIN)({
    component: Admin,
})
.addChildren([
    productRoute
])

export const adminRoute: any = IndexRoute.update({
    path: Paths.ADMIN,
    getParentRoute: () => rootRoute,
    
} as any)
