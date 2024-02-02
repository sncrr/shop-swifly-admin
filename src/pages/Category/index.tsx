import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CategoryState } from "./slice";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import CategoryList from "./CategoryList";
import { CategoryForm } from "./CategoryForm";

const basePath = Paths.CATEGORY;

export const CategoryRoutes = [
  {
    path: `${basePath}/`,
    element: CategoryList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: CategoryForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: CategoryForm,
  },
];

interface Props {
  categoryState: CategoryState;
}

export interface CategoryContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  categoryState: CategoryState;
}

const Main = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Outlet
      context={
        {
          dispatch,
          navigate,
          categoryState: props.categoryState,
        } satisfies CategoryContext
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  categoryState: state.category,
});

export const Category = connect(mapStateToProps)(Main);
