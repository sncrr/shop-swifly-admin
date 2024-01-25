import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NotFound from '../pages/404';
import Login from '../pages/Login';
import { useEffect } from 'react';
import { Admin } from './Admin';
import { getAccessToken } from '../utils/authUtils';
import { setUser } from './Admin/slice';

export const Root = () => {

  const dispatch = useDispatch();
  // const globalState = useSelector((state: RootState) => state.global);

  // const { user } = globalState;

  let user = getAccessToken();

  useEffect(() => {

    if (user)
      dispatch(setUser(user));
    else
      dispatch(setUser(null));

  }, [user])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={(
          user ? <Navigate to="/admin" />
            : <Login />
        )}
        />
        <Route
          path="/admin/*"
          element={(
            user ? <Admin />
              : <Navigate to="/login" />
          )}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}

// const PrivateRoute = ({ user, element }: any) => (
//   user ? element : <Navigate to="/login" />
// );