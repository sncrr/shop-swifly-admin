import { Sidebar } from "../../components/navigations/Sidebar";
import { Header } from "../../components/navigations/Header";
import { styled } from "styled-components";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { navigateStop } from "./slice";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Paths } from "../../constants";

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

  const { user } = props.state;
  
  useEffect(() => {
    if(!user) {
      navigate({
        to: Paths.LOGIN
      })
    }
  }, [user]);
  
  useEffect(() => {
    if(targetPath && navigateTo) {
      navigate(targetPath);
      dispatch(navigateStop());
    }
  }, [targetPath, navigateTo]);

  if(!user) return null;
  return (
    <>    
      <Header user={user}/>
      <Sidebar />

      <MainContainer>
        <div className="bg-white flex flex-col flex-1 rounded">
          <Outlet />
        </div>
      </MainContainer>
    </>
  )
}

const mapStateToProps = (state: any) => ({
	state: state.global
});

export const Admin = connect(mapStateToProps)(Main);