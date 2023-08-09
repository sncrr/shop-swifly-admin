import { all } from "redux-saga/effects";
import categorySaga from "../pages/Category/sagas";

export function* rootSaga() {
  yield all([

    categorySaga(),

  ]);
}