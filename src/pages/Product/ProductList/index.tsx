import { Section } from "../../../components/containers";
import { RowActions, TBody, TData, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";
import { Product } from "../../../types/Inventory/Product";
import { fetchProducts } from "../actions";
import ProductHelper from "../helper";
import { ProductState } from "../reducers";

interface Props {
	productState: ProductState,
	navigate: any,
	dispatch: any,
	selected: Product
}

export function ProductList(props: Props) {

	const { 
		dispatch, 
		navigate,
		productState 
	} = props;

	const {
		loading,
		products
	} = productState;

	const handleEdit = (id: any) => {
		navigate(`/admin/products/edit/${id}`)
	}

	const handleDelete = (id: any) => {

	}

	const handlePageChange = (value: any) => {
		dispatch(fetchProducts({
			page: value,
			itemsCount: productState.itemsCount
		}))
	}

	const handleItemsCountChange = (value: any) => {
		dispatch(fetchProducts({
			page: productState.selectedPage,
			itemsCount: value
		}))
	}

	return (
		<Section>
			<TableControls
				hasSearch
				onPageChange={handlePageChange}
				onItemsCountChange={handleItemsCountChange}
				totalPages={productState.totalPages}
			/>
			<Table isLoading={loading}>
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