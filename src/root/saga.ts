import { all } from "redux-saga/effects";
import categorySaga from "../pages/Category/sagas";
import toastSaga from "../components/toasts/saga";
import productSaga from "../pages/Product/sagas";
import storeSaga from "../pages/Store/sagas";
import settingSaga from "../pages/Configuration/sagas";

export function* rootSaga() {
  yield all([
    toastSaga(),

    categorySaga(),
    productSaga(),
    storeSaga(),

    settingSaga(),
  ]);
}