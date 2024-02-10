import { connect, useDispatch } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { Paths } from "../../constants";
import CustomerList from "./CustomerList";
import { CustomerState } from "./slice";
import { RootState } from "../../root/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { CustomerForm } from "./CustomerForm";

const basePath = Paths.CUSTOMER;

export const CustomerRoutes = [
  {
    path: `${basePath}/`,
    element: CustomerList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: CustomerForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: CustomerForm,
  },
];

interface Props {
  customerState: CustomerState;
}

export interface CustomerContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  customerState: CustomerState;
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
          customerState: props.customerState,
        } satisfies CustomerContext
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  customerState: state.customer,
});

export const Customer = connect(mapStateToProps)(Main);
