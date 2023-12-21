
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/navigations/Sidebar";
import { Header } from "../../components/navigations/Header";
import { Paths } from "../../constants";
import Dashboard from "../../pages/Dashboard";
import Category from "../../pages/Category";
import Store from "../../pages/Store";
import Product from '../../pages/Product';
import { styled } from "styled-components";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { navigateStop } from "../actions";

const MainContainer =styled.div`
  margin-top: 5rem;
  margin-left: 7rem;
  width: calc(100% - 7rem);
  padding: 0.5rem;
  /* min-height: calc(100% - 4rem); */
`

function Main (props : any) {

  const {targetPath, navigateTo} = props.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state:any) => state.user)

  useEffect(() => {
    if(targetPath && navigateTo) {
      navigate(targetPath);
      dispatch(navigateStop());
    }
  }, [targetPath, navigateTo]);

  return (
    <>    
      <Header user={user}/>
      <Sidebar />

      <MainContainer>
        <div className="bg-white rounded">
          <Routes>
            <Route path={Paths.DASHBOARD} element={<Dashboard />} />

            <Route path={`${Paths.CATEGORY}/*`} element={<Category />} />
            <Route path={`${Paths.PRODUCT}/*`} element={<Product />} />
            <Route path={`${Paths.STORE}/*`} element={<Store />} />

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
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </MainContainer>
    </>
  )
}

const mapStateToProps = (state: any) => ({
	state: state.global
});

export const Admin = connect(mapStateToProps)(Main);