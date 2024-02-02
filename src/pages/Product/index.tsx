import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CategoryState } from "../Category/slice";
import { StoreState } from "../Store/slice";
import { ProductState } from "./slice";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";

const basePath = Paths.PRODUCT;

export const ProductRoutes = [
  {
    path: `${basePath}/`,
    element: ProductList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: ProductForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: ProductForm,
  },
];

interface Props {
  productState: ProductState;
  storeState: StoreState;
  categoryState: CategoryState;
}

export interface ProductContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  productState: ProductState;
  categoryState: CategoryState;
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
          productState: props.productState,
          categoryState: props.categoryState,
          storeState: props.storeState,
        } satisfies ProductContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  productState: state.product,
  storeState: state.store,
  categoryState: state.category,
});

export const Product = connect(mapStateToProps)(Main);
