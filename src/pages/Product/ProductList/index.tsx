//UTILS
import { useEffect } from "react";
import { getThumbnailPath } from "../helper";

//COMPONENTS
import {
  RowActions,
  TBody,
  TData,
  THead,
  THeader,
  TRow,
  Table,
  TableControls,
} from "../../../components/tables";
import { Section } from "../../../components/containers";
import { deleteProduct, fetchProducts } from "../slice";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { getErrorMessage, getLocalData, setLocalData } from "../../../root/helper";
import { GetList, LocalData } from "../../../types/Utils/Paginate";
import { PRODUCT_LOCAL_KEY } from "../../../constants/global";
import { ProductContext } from "..";
import { useOutletContext } from "react-router-dom";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../components/toasts/slice";
import { importProducts } from "../controllers";

export function ProductList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(PRODUCT_LOCAL_KEY);

  const { dispatch, navigate, productState } =
    useOutletContext<ProductContext>();

  const { 
    fetching, 
    totalPages, 
    totalItems, 
    hasChanges,
    products
  } = productState;

  useEffect(() => {
    getProductList({});
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getProductList({});
    }
  }, [hasChanges, fetching]);

  //FUNCTIONS
  const getProductList = async ({
    page = localData.currentPage, 
    itemsCount = localData.itemsCount, 
    search = localData.search
  }: GetList) => {
    dispatch(
      fetchProducts({
        page,
        itemsCount,
        sort: "sku",
        search,
      })
    );

    setLocalData(PRODUCT_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
      search
    });
  };

  const handleEdit = (id: any) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this product?",
      onConfirm: () => dispatch(deleteProduct(id)),
    });
  };

  const handleSearch = (value: string) => {
    dispatch(
      fetchProducts({
        page: localData.currentPage,
        itemsCount: localData.itemsCount,
        sort: "sku",
        search: value,
      })
    );
    setLocalData(PRODUCT_LOCAL_KEY, {
      search: value,
    });
  };

  const handleImportProducts = async (file: any) => {
    dispatch(showLoader({text: "Uploading Products..."}))

    try {
      let formData = new FormData();
      formData.append('file', file);

      let result: any = await importProducts({
        data: formData
      });

      if(result.success) {
        dispatch(showToast(successToast(`${result.itemsUploaded} Barangays uploaded successfully`)))
        getProductList({page: 1});
      }
      else {
        dispatch(showToast(failedToast('Uploading products failed')))
      }
      
    } catch (error: any) {
      dispatch(showToast(failedToast(getErrorMessage(error))))
    }

    dispatch(hideLoader())
  }

  //RETURN
  return (
    <Section>
      <TableControls
        hasSearch
        hasImportCSV
        defaultSearchValue={localData.search}
        totalPages={totalPages}
        totalRows={totalItems}
        defaultCurrentPage={localData.currentPage}
        defaultPageItemsCount={localData.itemsCount}
        onRefreshList={getProductList}
        onSearch={handleSearch}
        onImportCSV={handleImportProducts}
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
          {products.map((item, index) => (
            <TRow key={index}>
              <TData>
                <input type="checkbox" />
              </TData>
              <TData>{item.sku}</TData>
              <TData className="items-center justify-center">
                <img
                  src={getThumbnailPath(item)}
                  alt={item.name}
                  className="w-20 h-20 self-center object-contain"
                />
              </TData>
              <TData>{item.name}</TData>
              <TData>
                {item.prices?.map((price, i) => (
                  <InventoryData
                    key={i.toString()}
                    label={price.source}
                    value={price.price}
                  />
                ))}
              </TData>
              <TData>
                {item.stocks?.map((stock, i) => (
                  <InventoryData
                    key={i.toString()}
                    label={stock.source}
                    value={stock.quantity}
                  />
                ))}
              </TData>
              <TData>
                <RowActions
                  buttons={[
                    { label: "Edit", onClick: () => handleEdit(item._id) },
                    { label: "Delete", onClick: () => handleDelete(item._id) },
                  ]}
                />
              </TData>
            </TRow>
          ))}
        </TBody>
      </Table>
    </Section>
  );
}

const InventoryData = ({ label, value }: any) => {
  return (
    <>
      <span className="space-x-1">
        <span>{label}</span>
        <span>:</span>
        <span className=" font-semibold">{value}</span>
      </span>
      <br />
    </>
  );
}
