//UTILS
import { Dispatch, useEffect } from "react";
import ProductHelper from "../helpers";

//COMPONENTS
import { RowActions, TBody, TData, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";
import { Section } from "../../../components/containers";
import { NavigateFunction } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { ProductState, deleteProduct, fetchProducts } from "../slice";
import { Product } from "../../../models/Product";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { getProductLocalData, setProductLocalData } from "../../../root/helper";
import { PRODUCT_LOCAL_KEY } from "../../../root/constants";
import { LocalData } from "../../../types/Utils/Paginate";

interface Props {
	productState: ProductState,
	navigate: NavigateFunction,
	dispatch: Dispatch<AnyAction>
}

export function ProductList(props: Props) {

	//HOOKS & VARIABLES
	const localData: LocalData = getProductLocalData(PRODUCT_LOCAL_KEY);
	const { search } = localData;
	const { navigate, dispatch, productState } = props;
	const { fetching, totalPages, hasChanges } = productState;
	const products: Product[] = productState.products;

	useEffect(() => {
		getProductList(localData.currentPage, localData.itemsCount);
	}, []);

    useEffect(() => {
        if (hasChanges && !fetching) {
            getProductList(localData.currentPage, localData.itemsCount);
        }
    }, [hasChanges, fetching])

	//FUNCTIONS
	const getProductList = async (page: number, itemsCount: number) => {

		dispatch(fetchProducts({
			page,
			itemsCount,
			sort: 'sku',
			order: 'asc',
			search
		}));

		setProductLocalData(PRODUCT_LOCAL_KEY, {
			currentPage: page,
			itemsCount
		});
	}

	const handleEdit = (id: any) => {
		navigate(`/admin/products/edit/${id}`)
	}

	const handleDelete = (id: any) => {
		showConfirmDialog({
            title: "Confirmation",
            content: "Are you sure you want to delete this product?",
            onConfirm: () => dispatch(deleteProduct(id))
        })
	}

	const handleSearch = (value: string) => {
		dispatch(fetchProducts({
			page: localData.currentPage,
			itemsCount: localData.itemsCount,
			sort: 'sku',
			order: 'asc',
			search: value
		}));
		setProductLocalData(PRODUCT_LOCAL_KEY, {
			search: value
		});
	}


	//RETURN
	return (
		<Section>
			<TableControls
				hasSearch
				defaultSearchValue={localData.search}
				totalPages={totalPages}
				defaultCurrentPage={localData.currentPage}
				defaultPageItemsCount={localData.itemsCount}
				onPageChange={getProductList}
				onItemsCountChange={getProductList}
				onSearch={handleSearch}
			/>
			<Table isLoading={fetching}>
				<THeader>
					<TRow>
						<THead></THead>
						<THead>SKU</THead>
						<THead>Image</THead>
						<THead>Name</THead>
						<THead>Prices</THead>
						<THead>Stocks</THead>
						<THead></THead>
					</TRow>
				</THeader>
				<TBody className="text-sm">
					{
						products.map((item, index) => (
							<TRow key={index}>
								<TData>
									<input type="checkbox" />
								</TData>
								<TData>{item.sku}</TData>
								<TData className="items-center justify-center">
									<img
										src={ProductHelper.getThumbnailPath(item)}
										alt={item.name}
										className="w-20 h-20 self-center object-contain"
									/>
								</TData>
								<TData>{item.name}</TData>
								<TData>
									{
										item.prices?.map((price, i) => (
											<DataList
												key={i.toString()}
												label={price.source}
												value={price.price}
											/>
										))
									}
								</TData>
								<TData>
									{
										item.stocks?.map((stock, i) => (
											<DataList
												key={i.toString()}
												label={stock.source}
												value={stock.quantity}
											/>
										))
									}
								</TData>
								<TData>
									<RowActions
										buttons={[
											{label: "Edit", onClick: () => handleEdit(item._id)},
											{label: "Delete", onClick: () => handleDelete(item._id)}
										]}
									/>
								</TData>
							</TRow>
						))
					}
				</TBody>
			</Table>
		</Section>
	)
}

function DataList({ label, value }: any) {
	return (
		<>
			<span className="space-x-1">
				<span>{label}</span>
				<span>:</span>
				<span className=" font-semibold">{value}</span>
			</span>
			<br />
		</>
	)
}