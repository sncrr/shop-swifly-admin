
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/navigations/Sidebar";
import { Header } from "../../components/navigations/Header";
import { styled } from "styled-components";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { paths } from "./paths";
import { navigateStop } from "./slice";

const MainContainer =styled.div`
  margin-top: 5rem;
  margin-left: 7rem;
  width: calc(100% - 7rem);
  padding: 0.5rem;
  min-height: calc(100% - 5rem);
  display: flex;  
  flex-direction: column;
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
        <div className="bg-white flex flex-col flex-1 rounded">
          <Routes>

            {
              paths.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={<item.element />}
                />
              ))
            }

            <Route
              path="/"
              element={<Navigate to="dashboard" />}
            />
            <Route path="*" element={<Navigate to="/not-found" />} />
            {/* <Route
              path={Paths.LOGIN}
              element={<Navigate to={Paths.DASHBOARD} />}
            />
            <Route
              path={Paths.SIGN_UP}
              element={<Navigate to={Paths.DASHBOARD} />}
            /> */}
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