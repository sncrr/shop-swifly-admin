import { createFileRoute } from '@tanstack/react-router';
import { Paths } from '../../constants';
import { rootRoute } from '../../root';
import { Login } from '.';

//@ts-ignore
const Route = createFileRoute(Paths.LOGIN)({
    component: Login,
})

export const loginRoute: any = Route.update({
    path: Paths.LOGIN,
    getParentRoute: () => rootRoute,
  } as any)
