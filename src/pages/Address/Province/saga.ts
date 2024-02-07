import * as ProvinceController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { Province } from "../../../models/Address";
import {
  actionTypes,
  deleteProvinceFailed,
  deleteProvinceSuccess,
  fetchProvincesFailed,
  fetchProvincesSuccess,
  saveProvinceFailed,
  saveProvinceSuccess,
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

function* onFetchProvinces(action: SagaProps) {

  try {
    const res: Response = yield call(
      ProvinceController.getAllProvinces, 
      action.payload
    );

    yield put(fetchProvincesSuccess(res));
  } catch (error) {
    yield put(fetchProvincesFailed(error));
  }
}

function* onSaveProvince(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Payment Method" }));

  try {
    const data: Province = id
      ? yield call(ProvinceController.updateProvince, action.payload)
      : yield call(ProvinceController.createProvince, action.payload);

    if (data._id) {
      yield put(saveProvinceSuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Payment Method saved successfully")));
  } catch (error: any) {
    console.error(error);
    yield put(saveProvinceFailed(error.response.data.message));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteProvince(action: any) {

  yield put(showLoader({ text: "Deleting Payment Method" }));

  try {
    const data: boolean = yield call(
      ProvinceController.deleteProvince,
      action.payload
    );

    if (data) {
      yield put(deleteProvinceSuccess(data));
      yield put(showToast(successToast("Payment Method deleted successfully")));
    }
  } catch (error) {
    yield put(deleteProvinceFailed(error));
    yield put(showToast(failedToast("Payment Method deleting failed")));
  }
}

//Root Saga
function* provinceSaga() {
  yield takeLatest(actionTypes.fetchProvinces, onFetchProvinces);
  yield takeLatest(actionTypes.saveProvince, onSaveProvince);
  yield takeLeading(actionTypes.deleteProvince, onDeleteProvince);
}

export default provinceSaga;
