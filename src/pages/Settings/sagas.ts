import * as SettingController from "./controllers";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  fetchSettingsFailed,
  fetchSettingsSuccess,
  saveSettingsFailed,
  saveSettingsSuccess,
} from "./slice";

function* onFetchSettings(action: any) {
  try {
    const { section, group } = action.payload;
    const data: Generator = yield call(SettingController.getSettingsByGroup, {
      section: `${section}/${group}`,
    });
    if (data) {
      yield put(fetchSettingsSuccess(data));
    }
  } catch (error) {
    yield put(fetchSettingsFailed(error));
  }
}

function* onSaveSettings(action: any) {
  // const { toastId } = yield put(ToastAction.createPromiseToast({
  //     message: "Saving Setting",
  // }));

  try {
    let data: Generator = yield call(
      SettingController.saveSettings,
      action.payload
    );

    if (data) {
      yield put(saveSettingsSuccess(data));
    }

    // yield put(ToastAction.updateToast(toastId, {
    //     message: "Setting saved successfully",
    //     result: ToastConstant.STATUS_SUCCESS
    // }));
  } catch (error) {
    yield put(saveSettingsFailed(error));

    // yield put(ToastAction.updateToast(toastId, {
    //     message: "Setting saving failed",
    //     result: ToastConstant.STATUS_FAILED
    // }));
  }
}

//Root Saga
function* settingSaga() {
  yield takeLatest(actionTypes.fetchSettings, onFetchSettings);
  yield takeLatest(actionTypes.saveSettings, onSaveSettings);
}

export default settingSaga;
