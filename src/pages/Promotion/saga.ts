import * as PromotionController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { Promotion } from "../../models/Promotion";
import { Paths } from "../../constants";
import { navigateTo } from "../Admin/slice";
import {
  actionTypes,
  deletePromotionFailed,
  deletePromotionSuccess,
  fetchPromotionsFailed,
  fetchPromotionsSuccess,
  savePromotionFailed,
  savePromotionSuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { hideLoader, showLoader } from "../../components/modals/slice";
import {
  failedToast,
  showToast,
  successToast,
} from "../../components/toasts/slice";
import { Response } from "../../utils/response";

function* onFetchPromotions(action: SagaProps) {
  try {
    const res: Response = yield call(
      PromotionController.getAllPromotions,
      action.payload.query
    );

    yield put(fetchPromotionsSuccess(res.data));
  } catch (error) {
    yield put(fetchPromotionsFailed(JSON.stringify(error)));
  }
}

function* onSavePromotion(action: SagaProps) {
  const { id, navigateToItem, navigateBack } = action.payload;
  
  yield put(showLoader({text: "Saving Promotion"}));

  try {
    const data: Promotion = id
      ? yield call(PromotionController.updatePromotion, action.payload)
      : yield call(PromotionController.createPromotion, action.payload);

    if (data._id) {
      yield put(savePromotionSuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.CATEGORY}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }

    yield put(showToast(successToast("Promotion saved successfully")));
  } catch (error) {
    yield put(savePromotionFailed(JSON.stringify(error)));
    yield put(showToast(failedToast("Promotion saving failed")));
  }

  yield put(hideLoader());
}

function* onDeletePromotion(action: any) {
  yield put(showLoader({ text: "Deleting Promotion" }));

  try {
    const data: boolean = yield call(
      PromotionController.deletePromotion,
      action.payload
    );

    if (data) {
      yield put(deletePromotionSuccess(data));
      yield put(showToast(successToast("Promotion saved successfully")));
    }
  } catch (error) {
    yield put(deletePromotionFailed(JSON.stringify(error)));

    yield put(showToast(failedToast("Promotion deleting failed")));
  }

  yield put(hideLoader());
}

//Root Saga
function* promotionSaga() {
  yield takeLatest(actionTypes.fetchPromotions, onFetchPromotions);
  yield takeLatest(actionTypes.savePromotion, onSavePromotion);
  yield takeLeading(actionTypes.deletePromotion, onDeletePromotion);
}

export default promotionSaga;
