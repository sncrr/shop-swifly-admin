import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from '../constants';
import { Admin } from './Admin';
import Login from '../pages/Login';
import NotFound from '../pages/404';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../utils/authUtils';
import { setUser } from '../root/slices/userSlice';

export function MainRoutes () {

  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user)

  useEffect(() => {
    checkUserInfo();
  }, [])

  const checkUserInfo = async () => {
    let accessToken = getAccessToken();

    if(accessToken) {
      dispatch(setUser(accessToken));
    }
    else {
      dispatch(setUser(null))
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {
          user && user.info ? (
            <>
              <Route path="/*" element={<Admin />} />
              <Route
                path={Paths.BASE}
                element={<Navigate to={Paths.ADMIN} replace />}
              />
              <Route
                path={Paths.LOGIN}
                element={<Navigate to={Paths.ADMIN} replace />}
              />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <Route
              path="/"
              element={<Navigate to={Paths.LOGIN} replace />}
            />
          )
        }
        <Route path={Paths.LOGIN} element={<Login />} />
        
        {/* This catch-all route will handle any unmatched paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* <Route
          path="*"
          element={<Navigate to={Paths.LOGIN} replace />}
        /> */}
      </Routes>
    </BrowserRouter>
  )
}