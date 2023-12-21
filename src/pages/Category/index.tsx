import { connect } from "react-redux";

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Paths } from "../../constants";
import { useEffect } from "react";
import { CategoryState } from "../Category/reducers";
import { StoreState } from "../Store/reducers";
import { fetchCategories, selectCategory } from "./actions";
import CategoryList from "./CategoryList";
import { CategoryForm } from "./CategoryForm";
import { getCategory } from "./controllers";
import { get } from "lodash";

interface Props {
	categoryState: CategoryState,
	storeState: StoreState,
}
function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const routePrams = useParams();

	const selected = props.categoryState.selected;
	const categories = props.categoryState.categories;

	useEffect(() => {
		dispatch(fetchCategories())
	}, [])

	// useEffect(() => {

	// 	const selectedId = get(routePrams, 'id', '');

	// 	const loadSelectedCategory = async () => {
	// 		try {
	// 			let result = await getCategory(selectedId);
	// 			if (result) {
	// 				dispatch(selectCategory(result));
	// 			}
	// 		} catch (error) {
	// 			navigate("/admin/categories");
	// 		}
	// 	}

	// 	if (selectedId) {
	// 		loadSelectedCategory();
	// 	}
	// 	else {
	// 		dispatch(selectCategory(null));
	// 	}
	// }, [routePrams]);


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
			<Route
				path={`/${Paths.CREATE}`}
				element={
					<CategoryForm
						dispatch={dispatch}
						navigate={navigate}
						categories={props.categoryState.categories}
						selected={selected}
					/>
				}
			/>
			<Route
				path={`/${Paths.EDIT}`}
				element={
					<CategoryForm
						dispatch={dispatch}
						navigate={navigate}
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