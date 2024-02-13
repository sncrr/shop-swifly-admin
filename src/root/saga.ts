import { all } from "redux-saga/effects";
import categorySaga from "../pages/Category/saga";
import toastSaga from "../components/toasts/saga";
import productSaga from "../pages/Product/saga";
import storeSaga from "../pages/Store/saga";
import settingSaga from "../pages/Settings/sagas";
import customerGroupSaga from "../pages/CustomerGroup/saga";
import provinceSaga from "../pages/Address/Province/saga";
import citySaga from "../pages/Address/City/saga";
import barangaySaga from "../pages/Address/Barangay/saga";
import customerSaga from "../pages/Customer/saga";
import promotionSaga from "../pages/Promotion/saga";

export function* rootSaga() {
  yield all([
    toastSaga(),

    categorySaga(),
    productSaga(),
    promotionSaga(),
    storeSaga(),

    customerSaga(),
    customerGroupSaga(),
    provinceSaga(),
    citySaga(),
    barangaySaga(),

    settingSaga(),
  ]);
}
