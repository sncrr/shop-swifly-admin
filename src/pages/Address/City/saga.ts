import * as CityController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { City } from "../../../models/Address";
import {
  actionTypes,
  deleteCityFailed,
  deleteCitySuccess,
  fetchCitiesFailed,
  fetchCitiesSuccess,
  saveCityFailed,
  saveCitySuccess,
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

function* onFetchCities(action: SagaProps) {

  try {
    const res: Response = yield call(
      CityController.getAllCities, 
      action.payload
    );

    yield put(fetchCitiesSuccess(res));
  } catch (error) {
    yield put(fetchCitiesFailed(error));
  }
}

function* onSaveCity(action: SagaProps) {

  const { id, navigateToItem, navigateBack } = action.payload;

  yield put(showLoader({ text: "Saving Payment Method" }));

  try {
    const data: City = id
      ? yield call(CityController.updateCity, action.payload)
      : yield call(CityController.createCity, action.payload);

    if (data._id) {
      yield put(saveCitySuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.STORE}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }
    yield put(showToast(successToast("Payment Method saved successfully")));
  } catch (error: any) {
    console.error(error);
    yield put(saveCityFailed(error.response.data.message));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteCity(action: any) {

  yield put(showLoader({ text: "Deleting Payment Method" }));

  try {
    const data: boolean = yield call(
      CityController.deleteCity,
      action.payload
    );

    if (data) {
      yield put(deleteCitySuccess(data));
      yield put(showToast(successToast("Payment Method deleted successfully")));
    }
  } catch (error) {
    yield put(deleteCityFailed(error));
    yield put(showToast(failedToast("Payment Method deleting failed")));
  }
}

//Root Saga
function* citySaga() {
  yield takeLatest(actionTypes.fetchCities, onFetchCities);
  yield takeLatest(actionTypes.saveCity, onSaveCity);
  yield takeLeading(actionTypes.deleteCity, onDeleteCity);
}

export default citySaga;
