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
import { ProductState } from "./reducers";

interface Props {
	state: ProductState,
	storeState: StoreState,
	categoryState: CategoryState,
}

function Main(props: Props) {

	const { selectedPage, itemsCount, totalPages } = props.state;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selected = props.state.selected;

	useEffect(() => {
		dispatch(fetchProducts({
			page: selectedPage,
			itemsCount: itemsCount
		}))
	}, []);

	return (
		<Routes>
			<Route
				path={Paths.BASE}
				element={
					<ProductList
						productState={props.state}
						navigate={navigate}
						selected={selected}
						dispatch={dispatch}
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