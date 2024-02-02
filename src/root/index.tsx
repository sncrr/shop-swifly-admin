import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getAccessToken } from "../utils/authUtils";
import { setUser } from "../pages/Admin/slice";
import { RootState } from "./reducers";
import { router } from "./router";

export const Main = (props: any) => {
  const dispatch = useDispatch();

  const { loading } = props.state;

  let user = getAccessToken();

  useEffect(() => {
    if (user) dispatch(setUser(user));
    else dispatch(setUser(null));
  }, []);

  if (loading) return null;
  return <RouterProvider router={router} />;
};

const mapStateToProps = (state: RootState) => ({
  state: state.global,
});

export const Root = connect(mapStateToProps)(Main);
