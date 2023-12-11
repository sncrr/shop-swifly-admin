import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";
import { CategoryTree } from "./CategoryTree";
import { CategoryHeader } from "./CategoryHeader";
import { fetchCategories, selectCategory } from "./actions";
import { useDispatch } from "react-redux";
import { getCategory } from "./controllers";

function Main({ state }: any) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selected = state.selected;
	const categories = state.categories;

	const queryString = location.search;
	const selectedId = queryString.slice(1);

	useEffect(() => {
		dispatch(fetchCategories())
	}, [])

	useEffect(() => {
		if (selectedId) {
			loadSelectedCategory();
		}
	}, [selectedId])

	const loadSelectedCategory = async () => {
		try {
			let result = await getCategory(selectedId);
			if (result) {
				dispatch(selectCategory(result));
			}
		} catch (error) {
			navigate("/admin/categories");
		}
	}

	return (
		<section className="flex">
			<div className="w-80 border-r">
				<CategoryTree
					categories={categories}
					navigate={navigate}
					selected={selected}
				/>
			</div>
			<div className="flex-1 p-2">
				<CategoryHeader
					dispatch={dispatch}
					navigate={navigate}
					selected={selected}
				/>
				<CategoryForm
					categories={categories}
					dispatch={dispatch}
					navigate={navigate}
					selected={selected}
				/>
			</div>
		</section>
	)
}

const mapStateToProps = (state: any) => ({
	state: state.category
});

const Category = connect(mapStateToProps)(Main);

export default Category;