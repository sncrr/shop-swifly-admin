import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PromotionState } from "./slice";
import { RootState } from "../../root/reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Paths } from "../../constants";
import PromotionList from "./PromotionList";
import { PromotionForm } from "./PromotionForm";

const basePath = Paths.PROMOTION;

export const PromotionRoutes = [
  {
    path: `${basePath}/`,
    element: PromotionList,
  },
  {
    path: `${basePath}/${Paths.CREATE}`,
    element: PromotionForm,
  },
  {
    path: `${basePath}/${Paths.EDIT}`,
    element: PromotionForm,
  },
];

interface Props {
  promotionState: PromotionState;
}

export interface PromotionContext {
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
  promotionState: PromotionState;
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
          promotionState: props.promotionState,
        } satisfies PromotionContext
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  promotionState: state.promotion,
});

export const Promotion = connect(mapStateToProps)(Main);
