
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "../../components/navigations/Sidebar";
import { Header } from "../../components/navigations/Header";
import { Paths } from "../../constants";
import Dashboard from "../../pages/Dashboard";
import NotFound from "../../pages/404";
import { styled } from "styled-components";
import Category from "../../pages/Category";
import Store from "../../pages/Store";

const MainContainer =styled.div`
  padding-top: 4rem;
  margin-left: 4rem;
  width: calc(100% - 4rem);
  /* min-height: calc(100% - 4rem); */
`

export function Admin () {

  return (
    <>    
      <Header />
      <Sidebar />

      <MainContainer>
        <Routes>
          <Route path={Paths.DASHBOARD} element={<Dashboard />} />
          <Route path={Paths.CATEGORY} element={<Category />} />
          <Route path={Paths.PRODUCT} element={<Dashboard />} />
          <Route path={Paths.STORE} element={<Store />} />
          <Route
            path={Paths.ADMIN}
            element={<Navigate to={Paths.DASHBOARD} replace />}
          />
          <Route
            path={Paths.LOGIN}
            element={<Navigate to={Paths.DASHBOARD} replace />}
          />
          <Route
            path={Paths.SIGN_UP}
            element={<Navigate to={Paths.DASHBOARD} replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContainer>
    </>
  )
}