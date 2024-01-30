import { connect } from "react-redux";
import { NavigateFunction, Outlet, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { CategoryState } from "./slice";
import { RootState } from "../../reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

interface Props {
	categoryState: CategoryState,
}

export interface CategoryContext {
	navigate: NavigateFunction,
	dispatch: Dispatch<AnyAction>,
	categoryState: CategoryState,
}

function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<Outlet 
			context={{
				dispatch, 
				navigate, 
				categoryState: props.categoryState
			} satisfies CategoryContext} 
		/>
	)
}

const mapStateToProps = (state: RootState) => ({
	categoryState: state.category,
});

const Category = connect(mapStateToProps)(Main);

export default Category;