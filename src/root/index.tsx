import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NotFound from '../pages/404'
import { setUser } from '../pages/Admin/slice'
import { getAccessToken } from '../utils/authUtils'
import { connect, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../reducers'
import { Paths } from '../constants'

const Main = (props: any) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = props.state;

    let user = getAccessToken();

    useEffect(() => {
        if (user)
            dispatch(setUser(user));
        else
            dispatch(setUser(null));
    }, []);

    useEffect(() => {
        if(!loading) {
            if(user) {
                navigate({to: Paths.ADMIN})
            }
            else {
                navigate({to: Paths.LOGIN})
            }
        }
    }, [user, loading])

    if (loading) return null;
    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    state: state.global
});

const Root = connect(mapStateToProps)(Main);

export const rootRoute = createRootRoute({
    notFoundComponent: NotFound,
    component: Root,
})

