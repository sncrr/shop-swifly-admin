import * as BarangayController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { Barangay } from "../../../models/Address";
import {
  actionTypes,
  deleteBarangayFailed,
  deleteBarangaySuccess,
  fetchBarangaysFailed,
  fetchBarangaysSuccess,
  saveBarangayFailed,
  saveBarangaySuccess,
} from "./slice";
import SagaProps from "../../../types/Utils/SagaProps";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { navigateTo } from "../../Admin/slice";
import { Paths } from "../../../constants";
import {
  failedToast,
  showToast,
  successToast,
} from "../../../components/toasts/slice";
import { Response } from "../../../utils/response";

function* onFetchBarangays(action: SagaProps) {

  try {
    const res: Response = yield call(
      BarangayController.getAllBarangays, 
      action.payload
    );

    yield put(fetchBarangaysSuccess(res));
  } catch (error) {
    yield put(fetchBarangaysFailed(error));
  }
}

function* onSaveBarangay(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Payment Method" }));

  try {
    const data: Barangay = id
      ? yield call(BarangayController.updateBarangay, action.payload)
      : yield call(BarangayController.createBarangay, action.payload);

    if (data._id) {
      yield put(saveBarangaySuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Payment Method saved successfully")));
  } catch (error: any) {
    console.error(error);
    yield put(saveBarangayFailed(error.response.data.message));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteBarangay(action: any) {

  yield put(showLoader({ text: "Deleting Payment Method" }));

  try {
    const data: boolean = yield call(
      BarangayController.deleteBarangay,
      action.payload
    );

    if (data) {
      yield put(deleteBarangaySuccess(data));
      yield put(showToast(successToast("Payment Method deleted successfully")));
    }
  } catch (error) {
    yield put(deleteBarangayFailed(error));
    yield put(showToast(failedToast("Payment Method deleting failed")));
  }
}

//Root Saga
function* barangaySaga() {
  yield takeLatest(actionTypes.fetchBarangays, onFetchBarangays);
  yield takeLatest(actionTypes.saveBarangay, onSaveBarangay);
  yield takeLeading(actionTypes.deleteBarangay, onDeleteBarangay);
}

export default barangaySaga;
