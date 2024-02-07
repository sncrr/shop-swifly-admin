import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { CityState } from "./slice";
import { CityList } from "./CityList";
// import { CityForm } from "./CityForm";
import { RootState } from "../../../root/reducers";
import { Paths } from "../../../constants";

const basePath = Paths.CITIES_MUNICIPALITIES;

export const CityRoutes = [
  {
    path: `${basePath}/`,
    element: CityList,
  },
  // {
  //   path: `${basePath}/${Paths.CREATE}`,
  //   element: CityForm,
  // },
  // {
  //   path: `${basePath}/${Paths.EDIT}`,
  //   element: CityForm,
  // },
];

interface Props {
  cityState: CityState;
}

export interface CityContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  cityState: CityState;
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
          cityState: props.cityState,
        } satisfies CityContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  cityState: state.city,
});

export const City = connect(mapStateToProps)(Main);
