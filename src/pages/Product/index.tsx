import { connect } from "react-redux";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { Paths } from "../../constants";
import { useEffect } from "react";
import { fetchProducts, selectProduct } from "./actions";
import { getProduct } from "./controllers";

function Main ({state, storeState}:any) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selected = state.selected;
  const products = state.products;

  const queryString = location.search;
  const selectedId = queryString.slice(1);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    if (selectedId) {
      loadSelectedCategory();
    }
  }, [selectedId])

  const loadSelectedCategory = async () => {
    let result = await getProduct(selectedId);
    if (result) {
      dispatch(selectProduct(result));
    }
  }

  return (
    <Routes>
      <Route 
        path={Paths.BASE} 
        element={
          <ProductList 
            products={products}
            navigate={navigate}
            selected={selected}
          />
        } 
      />
      <Route 
        path={`/${Paths.ADD}`} 
        element={
          <ProductForm 
            dispatch={dispatch}
            navigate={navigate}
            storeState={storeState}
          />
        } 
      />
      <Route 
        path={Paths.UPDATE}
        element={
          <ProductForm 
            dispatch={dispatch}
            navigate={navigate}
            storeState={storeState}
          />
        } 
      />
    </Routes>
  )
}

const mapStateToProps = (state: any) => ({
  state: state.product,
  storeState: state.store
});

const Product = connect(mapStateToProps)(Main);

export default Product;