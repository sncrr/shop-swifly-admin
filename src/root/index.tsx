import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Admin } from './Admin';
import NotFound from '../pages/404';
import Dashboard from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getAccessToken } from '../utils/authUtils';
import { setUser } from './Admin/slice';
import { RootState } from './reducers';
import Category from '../pages/Category';
import { Paths } from '../constants';
import { CategoryRoutes } from '../pages/Category/routes';
import Product from '../pages/Product';
import { ProductRoutes } from '../pages/Product/routes';
import Settings from '../pages/Settings';
import { SettingRoutes } from '../pages/Settings/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: Paths.ADMIN,
        element: <Admin />,
        children: [
          {
            path: Paths.DASHBOARD,
            element: <Dashboard />
          },
          {
            path: Paths.CATEGORY,
            element: <Category />,
            children: CategoryRoutes.map( item => ({
              path: item.path,
              element: <item.element />
            }))
          },
          {
            path: Paths.PRODUCT,
            element: <Product />,
            children: ProductRoutes.map( item => ({
              path: item.path,
              element: <item.element />
            }))
          },
          {
            path: Paths.SETTINGS,
            element: <Settings />,
            children: SettingRoutes.map( item => ({
              path: item.path,
              element: (
                <item.element 
                  children={item.children} 
                  section={item.code}
                />
              )
            }))
          },

          //Redirects
          {
            path: '/admin/',
            element: <Navigate to='/admin/dashboard' />
          },
        ],
      },
      {
        path: Paths.LOGIN,
        element: <Login />
      },
      {
        path: '/not-found',
        element: <NotFound />
      },

      //Redirects
      {
        path: '/',
        element: <Navigate to='/admin' />
      },
      {
        path: '*',
        element: <Navigate to='/not-found' />
      }
    ]
  },
])

export const Main = (props: any) => {

  const dispatch = useDispatch();

  const { loading } = props.state;

  let user = getAccessToken();

  useEffect(() => {
    if (user)
      dispatch(setUser(user));
    else
      dispatch(setUser(null));
  }, []);

  if(loading) return null;
  return <RouterProvider router={router} />
}

const mapStateToProps = (state: RootState) => ({
	state: state.global
});

export const Root = connect(mapStateToProps)(Main);