import * as ProductController from './controllers';
import { put, call, takeLatest, takeLeading, select } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { hideLoader } from '../../components/modals/slice';
import { Product } from '../../models/Product';
import { 
  actionTypes, 
  deleteProductFailed, 
  deleteProductSuccess, 
  fetchProductsFailed, 
  fetchProductsSuccess 
} from './slice';
import SagaProps from '../../types/Utils/SagaProps';

function* onFetchProducts (action: SagaProps) {

  const { page, itemsCount, sort, order, search } = action.payload;

  try {
    const data: Product[] = yield call(
      ProductController.getPaginateProducts, 
      page, 
      itemsCount,
      sort,
      order,
      search
    );

    yield put(fetchProductsSuccess(data));
    yield put(hideLoader());
  } 
  catch (error) {
    yield put(fetchProductsFailed(error));
    yield put(hideLoader());
  }
}

function* onSaveProduct(action: any):any {
  console.log(action);
  // const { toastId } = yield put(ToastAction.createPromiseToast({
  //   message: "Saving Product",
  // }));

  // try {
  //   const { id, navigateToItem, data } = action.payload;

  //   // const formData = new FormData();
  //   // formData.append('name', data.name);

  //   // const formData = mapToFormData(data);
  //   // console.log("DATA", JSON.parse(data));

  //   const files = new FileList();

  //   const result: Product = id ? 
  //     yield call(ProductController.updateProduct, formData) :
  //     yield call(ProductController.createProduct, formData);

  //   if(result._id) {
  //     // const productState = yield select((state) => state.product);

  //     yield put(saveProductSuccess(result));
  //     // yield call(ProductController.getPaginateProducts, productState.page, productState.itemsCount);
  //     // yield put(ProductAction.fetchProducts());

  //     if(navigateToItem) {
  //       yield put(replace(`?${result._id}`));
  //       // yield put(ProductAction.selectProduct(data));
  //     }
  //   }
  //   // yield put(ToastAction.updateToast(toastId, {
  //   //   message: "Product saved successfully",
  //   //   result: ToastConstant.STATUS_SUCCESS
  //   // }));
  // } 
  // catch (error) {
  //   yield put(saveProductFailed(JSON.stringify(error)));

  //   // yield put(ToastAction.updateToast(toastId, {
  //   //   message: "Product saving failed",
  //   //   result: ToastConstant.STATUS_FAILED
  //   // }));
  // }
}

function* onDeleteProduct(action: any):any {
  
  try {
    const data: boolean = yield call(ProductController.deleteProduct, action.payload);
    
    if(data) {

      yield select((state) => state.product);

      yield put(deleteProductSuccess(data));
      yield put(replace(``));

    }
  } 
  catch (error) {
    yield put(deleteProductFailed(error));
  }
}

//Root Saga
function* productSaga() {
  yield takeLatest(actionTypes.fetchProducts, onFetchProducts);
  yield takeLatest(actionTypes.saveProduct, onSaveProduct);
  yield takeLeading(actionTypes.deleteProduct, onDeleteProduct);
}

export default productSaga;