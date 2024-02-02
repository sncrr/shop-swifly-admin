import { all } from "redux-saga/effects";
import categorySaga from "../pages/Category/saga";
import toastSaga from "../components/toasts/saga";
import productSaga from "../pages/Product/saga";
import storeSaga from "../pages/Store/saga";
import settingSaga from "../pages/Settings/sagas";
import paymentMethodSaga from "../pages/PaymentMethods/saga";

export function* rootSaga() {
  yield all([
    toastSaga(),

    categorySaga(),
    productSaga(),
    storeSaga(),
    paymentMethodSaga(),

    settingSaga(),
  ]);
}
