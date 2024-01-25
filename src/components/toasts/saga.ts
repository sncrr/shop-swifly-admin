import { delay, put, takeEvery } from "redux-saga/effects";
import { destroyToast, toastActions } from './slice';
import SagaProps from "../../types/Utils/SagaProps";
import { ANIMATION_SPEED } from "./constants";

// function* onCreatePromiseToast (action: any) {
//   yield put(showToast({
//     ...action.data,
//     toastId: action.toastId
//   }));
// }

function* onHideToast (action: SagaProps) {
  yield delay(ANIMATION_SPEED);
  yield put(destroyToast(action.payload));
}

//Root Saga
function* toastSaga() {
  // yield takeEvery(constant.CREATE_PROMISE_TOAST, onCreatePromiseToast);
  yield takeEvery(toastActions.hideToast, onHideToast);
}

export default toastSaga;