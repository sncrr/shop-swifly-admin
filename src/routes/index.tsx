import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from '../constants';
import { Admin } from './Admin';
import Login from '../pages/Login';
import NotFound from '../pages/404';

export function MainRoutes () {
  const user = {
    info: true
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
            </>
          ) : (
            <Route
              path="/*"
              element={<Navigate to={Paths.LOGIN} replace />}
            />
          )
        }
        <Route path={Paths.LOGIN} element={<Login />} />
        
        {/* This catch-all route will handle any unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}