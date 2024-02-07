import * as PaymentMethodController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { PaymentMethod } from "../../models/PaymentMethod";
import {
  actionTypes,
  deletePaymentMethodFailed,
  deletePaymentMethodSuccess,
  fetchPaymentMethodsFailed,
  fetchPaymentMethodsSuccess,
  savePaymentMethodFailed,
  savePaymentMethodSuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { hideLoader, showLoader } from "../../components/modals/slice";
import { navigateTo } from "../Admin/slice";
import { Paths } from "../../constants";
import {
  failedToast,
  showToast,
  successToast,
} from "../../components/toasts/slice";
import { Response } from "../../utils/response";

function* onFetchPaymentMethods(action: SagaProps) {

  try {
    const res: Response = yield call(
      PaymentMethodController.getAllPaymentMethods, 
      action.payload
    );

    yield put(fetchPaymentMethodsSuccess(res.data));
  } catch (error) {
    yield put(fetchPaymentMethodsFailed(error));
  }
}

function* onSavePaymentMethod(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Payment Method" }));

  try {
    const data: PaymentMethod = id
      ? yield call(PaymentMethodController.updatePaymentMethod, action.payload)
      : yield call(PaymentMethodController.createPaymentMethod, action.payload);

    if (data._id) {
      yield put(savePaymentMethodSuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Payment Method saved successfully")));
  } catch (error: any) {
    console.error(error);
    yield put(savePaymentMethodFailed(error.response.data.message));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeletePaymentMethod(action: any) {

  yield put(showLoader({ text: "Deleting Payment Method" }));

  try {
    const data: boolean = yield call(
      PaymentMethodController.deletePaymentMethod,
      action.payload
    );

    if (data) {
      yield put(deletePaymentMethodSuccess(data));
      yield put(showToast(successToast("Payment Method deleted successfully")));
    }
  } catch (error) {
    yield put(deletePaymentMethodFailed(error));
    yield put(showToast(failedToast("Payment Method deleting failed")));
  }
}

//Root Saga
function* paymentMethodSaga() {
  yield takeLatest(actionTypes.fetchPaymentMethods, onFetchPaymentMethods);
  yield takeLatest(actionTypes.savePaymentMethod, onSavePaymentMethod);
  yield takeLeading(actionTypes.deletePaymentMethod, onDeletePaymentMethod);
}

export default paymentMethodSaga;
