import { connect } from "react-redux";

import { Outlet, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { CategoryState } from "../Category/slice";
import { StoreState } from "../Store/slice";
import { ProductState } from "./slice";
import { RootState } from "../../reducers";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

interface Props {
	productState: ProductState,
	storeState: StoreState,
	categoryState: CategoryState,
}

export interface ProductContext {
	navigate: any,
	dispatch: Dispatch<AnyAction>,
	productState: ProductState,
	categoryState: CategoryState,
	storeState: StoreState
}


function Main(props: Props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Outlet 
			// context={{
			// 	dispatch, 
			// 	navigate, 
			// 	productState: props.productState,
			// 	categoryState: props.categoryState,
			// 	storeState: props.storeState,
			// } satisfies ProductContext} 
			/>
		</>
	)
}

const mapStateToProps = (state: RootState) => ({
	productState: state.product,
	storeState: state.store,
	categoryState: state.category,
});

const Product = connect(mapStateToProps)(Main);

export default Product;