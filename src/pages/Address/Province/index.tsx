import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ProvinceState } from "./slice";
import { ProvinceList } from "./ProvinceList";
// import { ProvinceForm } from "./ProvinceForm";
import { RootState } from "../../../root/reducers";
import { Paths } from "../../../constants";

const basePath = Paths.PROVINCES;

export const ProvinceRoutes = [
  {
    path: `${basePath}/`,
    element: ProvinceList,
  },
  // {
  //   path: `${basePath}/${Paths.CREATE}`,
  //   element: ProvinceForm,
  // },
  // {
  //   path: `${basePath}/${Paths.EDIT}`,
  //   element: ProvinceForm,
  // },
];

interface Props {
  provinceState: ProvinceState;
}

export interface ProvinceContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  provinceState: ProvinceState;
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
          provinceState: props.provinceState,
        } satisfies ProvinceContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  provinceState: state.province,
});

export const Province = connect(mapStateToProps)(Main);
