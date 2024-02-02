import { connect } from "react-redux";

import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StoreState } from "../Store/slice";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import { StoreForm } from "./StoreForm";
import { StoreList } from "./StoreList";

const basePath = Paths.STORE;

export const StoreRoutes = [
  {
    path: `${basePath}/`,
    element: StoreList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: StoreForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: StoreForm,
  },
];

interface Props {
  storeState: StoreState;
}

export interface StoreContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  storeState: StoreState;
}

function Main(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Outlet
      context={
        {
          dispatch,
          navigate,
          storeState: props.storeState,
        } satisfies StoreContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  storeState: state.store,
});

export const Store = connect(mapStateToProps)(Main);
