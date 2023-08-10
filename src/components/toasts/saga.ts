import * as constant from './constants';
import * as ToastAction from './actions';
import { delay, put, takeEvery } from "redux-saga/effects";

function* onCreatePromiseToast (action: any) {
  yield put(ToastAction.showToast({
    ...action.data,
    toastId: action.toastId
  }));
}

function* onHideToast (action: any) {
  yield delay(500);
  yield put(ToastAction.destroyToast(action.data));
}

//Root Saga
function* toastSaga() {
  yield takeEvery(constant.CREATE_PROMISE_TOAST, onCreatePromiseToast);
  yield takeEvery(constant.HIDE_TOAST, onHideToast);
}

export default toastSaga;