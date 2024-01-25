import { connect } from "react-redux";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Paths } from "../../constants";
import { CategoryState } from "./slice";
import CategoryList from "./CategoryList";
import { CategoryForm } from "./CategoryForm";
import { RootState } from "../../root/reducers";

interface Props {
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
					<CategoryList
						categoryState={props.categoryState}
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
						categoryState={props.categoryState}
					/>
				}
			/>
			<Route
				path={`/${Paths.EDIT}`}
				element={
					<CategoryForm
						dispatch={dispatch}
						navigate={navigate}
						categoryState={props.categoryState}
					/>
				}
			/>
		</Routes>
	)
}

const mapStateToProps = (state: RootState) => ({
	categoryState: state.category,
});

const Category = connect(mapStateToProps)(Main);

export default Category;