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
import { deleteProvince, fetchProvinces } from "../slice";
import { Province } from "../../../../models/Address";
import { showConfirmDialog } from "../../../../components/alerts/actions";
import { getErrorMessage, getLocalData, setLocalData } from "../../../../root/helper";
import { LocalData } from "../../../../types/Utils/Paginate";
import { ADDRESS_PROVINCE_LOCAL_KEY, DEFAULT_ITEMS_COUNT, SERVER_URL } from "../../../../constants/global";
import { ProvinceContext } from "..";
import { useOutletContext } from "react-router-dom";
import { hideLoader, showLoader } from "../../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../../components/toasts/slice";
import { uploadProvinces } from "../controllers";

export function ProvinceList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(ADDRESS_PROVINCE_LOCAL_KEY);
  const { search } = localData;

  const { dispatch, navigate, provinceState } =
    useOutletContext<ProvinceContext>();

  const { fetching, totalPages, totalItems, hasChanges} = provinceState;
  const provinces: Province[] = provinceState.provinces;

  useEffect(() => {
    getProvinceList(localData.currentPage, localData.itemsCount);
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getProvinceList(localData.currentPage, localData.itemsCount);
    }
  }, [hasChanges, fetching]);

  //FUNCTIONS
  const getProvinceList = async (page: number, itemsCount: number) => {
    dispatch(
      fetchProvinces({
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
    navigate(`/admin/provinces/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this province?",
      onConfirm: () => dispatch(deleteProvince(id)),
    });
  };

  const handleSearch = (value: string) => {
    dispatch(
      fetchProvinces({
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

  const handleImportProvince = async (file: any) => {
    dispatch(showLoader({text: "Uploading Provinces..."}))

    try {
      let formData = new FormData();
      formData.append('file', file);

      let result: any = await uploadProvinces({
        data: formData
      });

      if(result.success) {
        dispatch(showToast(successToast(`${result.itemsUploaded} Provinces uploaded successfully`)))
        getProvinceList(1, DEFAULT_ITEMS_COUNT);
      }
      else {
        dispatch(showToast(failedToast('Uploading provinces failed')))
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
        onPageChange={getProvinceList}
        onItemsCountChange={getProvinceList}
        onSearch={handleSearch}
        onImportCSV={handleImportProvince}
        importSampleLink={`${SERVER_URL}/files/csv/import-province.csv`}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Code</THead>
            <THead>Name</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody className="text-sm">
          {provinces.map((item, index) => (
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
