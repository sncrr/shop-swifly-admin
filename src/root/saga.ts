import { all } from "redux-saga/effects";
import categorySaga from "../pages/Category/sagas";
import toastSaga from "../components/toasts/saga";

export function* rootSaga() {
  yield all([
    toastSaga(),

    categorySaga(),
  ]);
}