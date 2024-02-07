import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import { CustomerGroupState } from "./slice";
import { CustomerGroupList } from "./CustomerGroupList";
import { CustomerGroupForm } from "./CustomerGroupForm";
const basePath = Paths.CUSTOMER_GROUP;

export const CustomerGroupRoutes = [
  {
    path: `${basePath}/`,
    element: CustomerGroupList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: CustomerGroupForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: CustomerGroupForm,
  },
];

interface Props {
  customerGroupState: CustomerGroupState;
}

export interface CustomerGroupContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  customerGroupState: CustomerGroupState;
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
          customerGroupState: props.customerGroupState,
        } satisfies CustomerGroupContext
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  customerGroupState: state.customerGroup,
});

export const CustomerGroup = connect(mapStateToProps)(Main);
