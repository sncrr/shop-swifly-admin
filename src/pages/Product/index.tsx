import { connect } from "react-redux";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { Paths } from "../../constants";
import { useEffect } from "react";
import { fetchProducts } from "./actions";
import { CategoryState } from "../Category/reducers";
import { StoreState } from "../Store/reducers";

interface Props {
	state: any,
	storeState: StoreState,
	categoryState: CategoryState,
}

function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selected = props.state.selected;
	const products = props.state.products;

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

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
				path={`/${Paths.CREATE}`}
				element={
					<ProductForm
						dispatch={dispatch}
						navigate={navigate}
						storeState={props.storeState}
						categories={props.categoryState.categories}
						selected={selected}
					/>
				}
			/>
			<Route
				path={`/${Paths.EDIT}`}
				element={
					<ProductForm
						dispatch={dispatch}
						navigate={navigate}
						storeState={props.storeState}
						categories={props.categoryState.categories}
						selected={selected}
					/>
				}
			/>
		</Routes>
	)
}

const mapStateToProps = (state: any) => ({
	state: state.product,
	storeState: state.store,
	categoryState: state.category,
});

const Product = connect(mapStateToProps)(Main);

export default Product;