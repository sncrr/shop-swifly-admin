import * as constant from './constants';
import { put, call, takeLatest, takeLeading } from 'redux-saga/effects';
import { CategoryController } from '../../controllers';
import { Category } from '../../types/Category';
import SagaProps from '../../types/SagaProps';
import * as CategoryAction from './actions';
import { 
  fetchCategoriesSuccess, 
  fetchCategoriesFailed,
  saveCategorySuccess,
  saveCategoryFailed,
  deleteCategorySuccess,
  deleteCategoryFailed, 
} from './actions';
import { hideLoader, showLoader } from '../../components/modals/actions';
import { push, replace } from 'connected-react-router';

function* onFetchCategories () {
  try {

    // yield put(showLoader());

    const data: Category[] = yield call(CategoryController.getAllCategories);

    yield put(fetchCategoriesSuccess(data));
    yield put(hideLoader());
  } 
  catch (error) {
    yield put(fetchCategoriesFailed(error));
    yield put(hideLoader());
  }
}

function* onSaveCategory(action: any) {
  try {
    // yield put(showLoader());

    const { id, navigateToItem } = action.payload;
    const data: Category = id ? 
      yield call(CategoryController.updateCategory, action.payload) :
      yield call(CategoryController.createCategory, action.payload);

    if(data._id) {
      yield put(saveCategorySuccess(data));
      yield put(CategoryAction.fetchCategories());

      if(navigateToItem) {
        yield put(replace(`?${data._id}`));
      }
    }
    yield put(hideLoader());
  } 
  catch (error) {
    yield put(saveCategoryFailed(error));
    yield put(hideLoader());
  }
}

function* onDeleteCategory(action: SagaProps) {
  try {
    // yield put(showLoader());
    const data: boolean = yield call(CategoryController.deleteCategory, action.payload);
    
    if(data) {
      yield put(deleteCategorySuccess(data));
      yield put(CategoryAction.fetchCategories());
      yield put(replace(``));
    }
  } 
  catch (error) {
    yield put(deleteCategoryFailed(error));
  }
}

//Root Saga
function* categorySaga() {
  yield takeLatest(constant.FETCH_CATEGORIES, onFetchCategories);
  yield takeLatest(constant.SAVE_CATEGORY, onSaveCategory);
  yield takeLeading(constant.DELETE_CATEGORY, onDeleteCategory);
}

export default categorySaga;