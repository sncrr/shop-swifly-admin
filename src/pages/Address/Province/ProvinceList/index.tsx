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
import { GetList, LocalData } from "../../../../types/Utils/Paginate";
import { ADDRESS_PROVINCE_LOCAL_KEY, SERVER_URL } from "../../../../constants/global";
import { ProvinceContext } from "..";
import { useOutletContext } from "react-router-dom";
import { hideLoader, showLoader } from "../../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../../components/toasts/slice";
import { uploadProvinces } from "../controllers";

export function ProvinceList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(ADDRESS_PROVINCE_LOCAL_KEY);

  const { dispatch, navigate, provinceState } =
    useOutletContext<ProvinceContext>();

  const { fetching, totalPages, totalItems, hasChanges} = provinceState;
  const provinces: Province[] = provinceState.provinces;

  useEffect(() => {
    getProvinceList({});
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getProvinceList({});
    }
  }, [hasChanges, fetching]);

  //FUNCTIONS
  const getProvinceList = async ({
    page = localData.currentPage, 
    itemsCount = localData.itemsCount, 
    search = localData.search
  }: GetList) => {
    dispatch(
      fetchProvinces({
        page,
        itemsCount,
        sort: "name",
        search,
      })
    );

    setLocalData(ADDRESS_PROVINCE_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
      search: search,
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
    getProvinceList({
      search: value
    })
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
        getProvinceList({ page: 1 });
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
        onRefreshList={getProvinceList}
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
