import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import { PaymentMethodState } from "./slice";
import { PaymentMethodList } from "./PaymentMethodList";
import { PaymentMethodForm } from "./PaymentMethodForm";
const basePath = Paths.PAYMENT_METHOD;

export const PaymentMethodRoutes = [
  {
    path: `${basePath}/`,
    element: PaymentMethodList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: PaymentMethodForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: PaymentMethodForm,
  },
];

interface Props {
  paymentMethodState: PaymentMethodState;
}

export interface PaymentMethodContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  paymentMethodState: PaymentMethodState;
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
          paymentMethodState: props.paymentMethodState,
        } satisfies PaymentMethodContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  paymentMethodState: state.paymentMethod,
});

export const PaymentMethod = connect(mapStateToProps)(Main);
