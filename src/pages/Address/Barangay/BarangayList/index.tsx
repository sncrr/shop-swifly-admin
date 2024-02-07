//UTILS
import { useEffect } from "react";

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
} from "../../../../components/tables";
import { Section } from "../../../../components/containers";
import { deleteBarangay, fetchBarangays } from "../slice";
import { Barangay } from "../../../../models/Address";
import { showConfirmDialog } from "../../../../components/alerts/actions";
import { getErrorMessage, getLocalData, setLocalData } from "../../../../root/helper";
import { LocalData } from "../../../../types/Utils/Paginate";
import { ADDRESS_PROVINCE_LOCAL_KEY, DEFAULT_ITEMS_COUNT, SERVER_URL } from "../../../../constants/global";
import { BarangayContext } from "..";
import { useOutletContext } from "react-router-dom";
import { hideLoader, showLoader } from "../../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../../components/toasts/slice";
import { uploadBarangays } from "../controllers";

export function BarangayList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(ADDRESS_PROVINCE_LOCAL_KEY);
  const { search } = localData;

  const { dispatch, navigate, barangayState } =
    useOutletContext<BarangayContext>();

  const { fetching, totalPages, totalItems, hasChanges} = barangayState;
  const barangays: Barangay[] = barangayState.barangays;

  useEffect(() => {
    getBarangayList(localData.currentPage, localData.itemsCount);
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getBarangayList(localData.currentPage, localData.itemsCount);
    }
  }, [hasChanges, fetching]);

  //FUNCTIONS
  const getBarangayList = async (page: number, itemsCount: number) => {
    dispatch(
      fetchBarangays({
        page,
        itemsCount,
        sort: "name",
        order: "asc",
        search,
      })
    );

    setLocalData(ADDRESS_PROVINCE_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
    });
  };

  const handleEdit = (id: any) => {
    navigate(`/admin/barangays/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this province?",
      onConfirm: () => dispatch(deleteBarangay(id)),
    });
  };

  const handleSearch = (value: string) => {
    dispatch(
      fetchBarangays({
        page: localData.currentPage,
        itemsCount: localData.itemsCount,
        sort: "name",
        order: "asc",
        search: value,
      })
    );
    setLocalData(ADDRESS_PROVINCE_LOCAL_KEY, {
      search: value,
    });
  };

  const handleImportBarangay = async (file: any) => {
    dispatch(showLoader({text: "Uploading Barangays..."}))

    try {
      let formData = new FormData();
      formData.append('file', file);

      let result: any = await uploadBarangays({
        data: formData
      });

      if(result.success) {
        dispatch(showToast(successToast(`${result.itemsUploaded} Barangays uploaded successfully`)))
        getBarangayList(1, DEFAULT_ITEMS_COUNT);
      }
      else {
        dispatch(showToast(failedToast('Uploading barangays failed')))
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
        hasImportButton
        defaultSearchValue={localData.search}
        totalPages={totalPages}
        totalRows={totalItems}
        defaultCurrentPage={localData.currentPage}
        defaultPageItemsCount={localData.itemsCount}
        onPageChange={getBarangayList}
        onItemsCountChange={getBarangayList}
        onSearch={handleSearch}
        onImportCSV={handleImportBarangay}
        importSampleLink={`${SERVER_URL}/files/csv/import-barangay.csv`}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Code</THead>
            <THead>Name</THead>
            <THead>Province Code</THead>
            <THead>City Code</THead>
            <THead>Store Code</THead>
            <THead>Tier</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody className="text-sm">
          {barangays.map((item, index) => (
            <TRow key={index}>
              <TData>
                <input type="checkbox" />
              </TData>
              <TData>
                {item.code}
              </TData>
              <TData>
                {item.name}
              </TData>
              <TData>
                {item.provinceCode}
              </TData>
              <TData>
                {item.cityCode}
              </TData>
              <TData>
                {item.storeCode}
              </TData>
              <TData>
                {item.tier}
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
