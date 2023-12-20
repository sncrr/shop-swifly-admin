import { connect } from "react-redux";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Paths } from "../../constants";
import { useEffect } from "react";
import { CategoryState } from "../Category/reducers";
import { StoreState } from "../Store/reducers";
import { fetchCategories } from "./actions";
import CategoryList from "./CategoryList";

interface Props {
	categoryState: CategoryState,
	storeState: StoreState,
}
function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selected = props.categoryState.selected;
	const categories = props.categoryState.categories;

	useEffect(() => {
		dispatch(fetchCategories())
	}, [])

	return (
		<Routes>
			<Route
				path={Paths.BASE}
				element={
					<CategoryList
						categories={categories}
						navigate={navigate}
						dispatch={dispatch}
					/>
				}
			/>
			{/* <Route
				path={`/${Paths.ADD}`}
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
			/> */}
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