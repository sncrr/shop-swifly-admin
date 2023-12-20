import { GhostBtn, LinkBtn } from "../../../components/buttons";
import { TBody, TData, THead, THeader, TRow, Table } from "../../../components/tables";
import { TableControls } from "../../../components/tables/TableControls";
import { Product } from "../../../types/Inventory/Product";
import ProductHelper from "../helper";

interface Props {
	products: Product[],
	navigate: any,
	selected: Product
}

export function ProductList(props: Props) {

	const handleEdit = (id: any) => {
		props.navigate(`/admin/products/edit/${id}`)
	}

	const handleDelete = (id: any) => {

	}

	return (
		<div className="p-4">
			<TableControls />
			<Table>
				<THeader>
					<TRow>
						<THead></THead>
						<THead>ID</THead>
						<THead>Image</THead>
						<THead>Name</THead>
						<THead>Prices</THead>
						<THead>Stocks</THead>
						<THead></THead>
					</TRow>
				</THeader>
				<TBody className="text-sm">
					{
						props.products.map((item, index) => (
							<TRow key={index}>
								<TData>
									<input type="checkbox" />
								</TData>
								<TData>{item._id}</TData>
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
									<div className="flex">
										<LinkBtn onClick={() => handleEdit(item._id)}>
											Edit
										</LinkBtn>
										<LinkBtn onClick={() => handleDelete(item._id)}>
											Delete
										</LinkBtn>
								</div>
							</TData>
                        </TRow>
				))
                   }
			</TBody>
		</Table>
        </div >
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