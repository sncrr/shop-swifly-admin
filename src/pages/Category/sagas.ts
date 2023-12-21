import * as constant from './constants';
import * as CategoryController from './controllers';
import * as CategoryAction from './actions';
import * as ToastAction from '../../components/toasts/actions';
import { put, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { Category } from '../../types/Inventory/Category';
import { 
  fetchCategoriesSuccess, 
  fetchCategoriesFailed,
  saveCategorySuccess,
  saveCategoryFailed,
  deleteCategorySuccess,
  deleteCategoryFailed, 
} from './actions';
import { hideLoader, showLoader } from '../../components/modals/actions';
import * as ToastConstant from '../../components/toasts/constants';
import { navigateTo } from '../../routes/actions';
import { Paths } from '../../constants';
import { useNavigate } from 'react-router-dom';

function* onFetchCategories () {
  try {
    const data: Category[] = yield call(CategoryController.getAllCategories);

    yield put(fetchCategoriesSuccess(data));
  } 
  catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

function* onSaveCategory(action: any) {
  
  const { id, navigateToItem, navigateBack, hasLoader } = action.payload;

  if(hasLoader) {
    yield put(showLoader());
  }


  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Saving Category",
  }));

  try {
    
    const data: Category = id ? 
      yield call(CategoryController.updateCategory, action.payload) :
      yield call(CategoryController.createCategory, action.payload);

    if(data._id) {
      yield put(saveCategorySuccess(data));
      yield put(CategoryAction.fetchCategories());

      if(navigateToItem) {
        yield put(CategoryAction.selectCategory(data));
        yield put(navigateTo(`${Paths.CATEGORY}/edit/${data._id}`))
      }
      else if (navigateBack) {
        yield put(navigateTo(-1))
      }
    }
    yield put(ToastAction.updateToast(toastId, {
      message: "Category saved successfully",
      result: ToastConstant.STATUS_SUCCESS
    }));
  } 
  catch (error) {
    yield put(saveCategoryFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Category saving failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }

  if(hasLoader) {
    yield put(hideLoader());
  }
}

function* onDeleteCategory(action: any) {
  
  const { toastId } = yield put(ToastAction.createPromiseToast({
    message: "Deleting category...",
  }));

  try {
    const data: boolean = yield call(CategoryController.deleteCategory, action.payload);
    
    if(data) {
      yield put(deleteCategorySuccess(data));
      yield put(CategoryAction.fetchCategories());
      // yield put(replace(``));

      yield put(ToastAction.updateToast(toastId, {
        message: "Category deleted successfully",
        result: ToastConstant.STATUS_SUCCESS
      }));
    }
  } 
  catch (error) {
    yield put(deleteCategoryFailed(error));

    yield put(ToastAction.updateToast(toastId, {
      message: "Category deleting failed",
      result: ToastConstant.STATUS_FAILED
    }));
  }
}

//Root Saga
function* categorySaga() {
  yield takeLatest(constant.FETCH_CATEGORIES, onFetchCategories);
  yield takeLatest(constant.SAVE_CATEGORY, onSaveCategory);
  yield takeLeading(constant.DELETE_CATEGORY, onDeleteCategory);
}

export default categorySaga;