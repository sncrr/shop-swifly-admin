import * as constant from './constants';

//SELECTOR
export const selectProduct = (data: any) => ({
    type: constant.SELECT_CUSTOMER,
    data,
})

//FETCH CUSTOMER
export const fetchCustomers = (data: {
  page: number,
  itemsCount: number
}) => ({
  type: constant.FETCH_CUSTOMERS,
  data
});
export const fetchCustomersSuccess = (data: any) => ({
  type: constant.FETCH_CUSTOMERS_SUCCESS,
  data,
});
export const fetchCustomersFailed = (error: any) => ({
  type: constant.FETCH_CUSTOMERS_FAILED,
  error,
});