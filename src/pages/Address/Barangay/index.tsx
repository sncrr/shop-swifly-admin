import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { BarangayState } from "./slice";
import { BarangayList } from "./BarangayList";
// import { BarangayForm } from "./BarangayForm";
import { RootState } from "../../../root/reducers";
import { Paths } from "../../../constants";

const basePath = Paths.BARANGAYS;

export const BarangayRoutes = [
  {
    path: `${basePath}/`,
    element: BarangayList,
  },
  // {
  //   path: `${basePath}/${Paths.CREATE}`,
  //   element: BarangayForm,
  // },
  // {
  //   path: `${basePath}/${Paths.EDIT}`,
  //   element: BarangayForm,
  // },
];

interface Props {
  barangayState: BarangayState;
}

export interface BarangayContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  barangayState: BarangayState;
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
          barangayState: props.barangayState,
        } satisfies BarangayContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  barangayState: state.barangay,
});

export const Barangay = connect(mapStateToProps)(Main);
