import { connect } from "react-redux";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { Paths } from "../../constants";
import { CategoryState } from "../Category/slice";
import { StoreState } from "../Store/slice";
import { ProductState } from "./slice";
import { RootState } from "../../root/reducers";

interface Props {
	state: ProductState,
	storeState: StoreState,
	categoryState: CategoryState,
}

function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<Routes>
			<Route
				path={Paths.BASE}
				element={
					<ProductList
						navigate={navigate}
						dispatch={dispatch}
						productState={props.state}
					/>
				}
			/>
			<Route
				path={`/${Paths.CREATE}`}
				element={
					<ProductForm
						dispatch={dispatch}
						navigate={navigate}
						productState={props.state}
						storeState={props.storeState}
						categoryState={props.categoryState}
					/>
				}
			/>
			<Route
				path={`/${Paths.EDIT}`}
				element={
					<ProductForm
						dispatch={dispatch}
						navigate={navigate}
						productState={props.state}
						storeState={props.storeState}
						categoryState={props.categoryState}
					/>
				}
			/>
		</Routes>
	)
}

const mapStateToProps = (state: RootState) => ({
	state: state.product,
	storeState: state.store,
	categoryState: state.category,
});

const Product = connect(mapStateToProps)(Main);

export default Product;