import * as CategoryController from "./controllers";
import { put, call, takeLatest, takeLeading } from "redux-saga/effects";
import { Category } from "../../models/Category";
import { Paths } from "../../constants";
import { navigateTo } from "../Admin/slice";
import {
  actionTypes,
  deleteCategoryFailed,
  deleteCategorySuccess,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
  saveCategoryFailed,
  saveCategorySuccess,
} from "./slice";
import SagaProps from "../../types/Utils/SagaProps";
import { hideLoader, showLoader } from "../../components/modals/slice";
import {
  failedToast,
  showToast,
  successToast,
} from "../../components/toasts/slice";
import { Response } from "../../utils/response";

function* onFetchCategories(action: SagaProps) {
  try {
    const res: Response = yield call(
      CategoryController.getAllCategories,
      action.payload
    );

    yield put(fetchCategoriesSuccess(res.data));
  } catch (error) {
    yield put(fetchCategoriesFailed(JSON.stringify(error)));
  }
}

function* onSaveCategory(action: SagaProps) {
  const { id, navigateToItem, navigateBack } = action.payload;
  
  yield put(showLoader({text: "Saving Category"}));

  try {
    const data: Category = id
      ? yield call(CategoryController.updateCategory, action.payload)
      : yield call(CategoryController.createCategory, action.payload);

    if (data._id) {
      yield put(saveCategorySuccess(data));

      if (navigateToItem) {
        yield put(navigateTo(`${Paths.CATEGORY}/edit/${data._id}`));
      } else if (navigateBack) {
        yield put(navigateTo(-1));
      }
    }

    yield put(showToast(successToast("Category saved successfully")));
  } catch (error) {
    yield put(saveCategoryFailed(JSON.stringify(error)));
    yield put(showToast(failedToast("Category saving failed")));
  }

  yield put(hideLoader());
}

function* onDeleteCategory(action: any) {
  yield put(showLoader({ text: "Deleting Category" }));

  try {
    const data: boolean = yield call(
      CategoryController.deleteCategory,
      action.payload
    );

    if (data) {
      yield put(deleteCategorySuccess(data));
      yield put(showToast(successToast("Category saved successfully")));
    }
  } catch (error) {
    yield put(deleteCategoryFailed(JSON.stringify(error)));

    yield put(showToast(failedToast("Category deleting failed")));
  }

  yield put(hideLoader());
}

//Root Saga
function* categorySaga() {
  yield takeLatest(actionTypes.fetchCategories, onFetchCategories);
  yield takeLatest(actionTypes.saveCategory, onSaveCategory);
  yield takeLeading(actionTypes.deleteCategory, onDeleteCategory);
}

export default categorySaga;
