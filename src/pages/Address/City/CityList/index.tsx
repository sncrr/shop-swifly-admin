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
import { deleteCity, fetchCities } from "../slice";
import { City } from "../../../../models/Address";
import { showConfirmDialog } from "../../../../components/alerts/actions";
import { getErrorMessage, getLocalData, setLocalData } from "../../../../root/helper";
import { LocalData } from "../../../../types/Utils/Paginate";
import { ADDRESS_PROVINCE_LOCAL_KEY, DEFAULT_ITEMS_COUNT, SERVER_URL } from "../../../../constants/global";
import { CityContext } from "..";
import { useOutletContext } from "react-router-dom";
import { hideLoader, showLoader } from "../../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../../components/toasts/slice";
import { uploadCities } from "../controllers";

export function CityList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(ADDRESS_PROVINCE_LOCAL_KEY);
  const { search } = localData;

  const { dispatch, navigate, cityState } =
    useOutletContext<CityContext>();

  const { fetching, totalPages, totalItems, hasChanges} = cityState;
  const cities: City[] = cityState.cities;

  useEffect(() => {
    getCityList(localData.currentPage, localData.itemsCount);
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getCityList(localData.currentPage, localData.itemsCount);
    }
  }, [hasChanges, fetching]);

  //FUNCTIONS
  const getCityList = async (page: number, itemsCount: number) => {
    dispatch(
      fetchCities({
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
    navigate(`/admin/cities/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this province?",
      onConfirm: () => dispatch(deleteCity(id)),
    });
  };

  const handleSearch = (value: string) => {
    dispatch(
      fetchCities({
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

  const handleImportCity = async (file: any) => {
    dispatch(showLoader({text: "Uploading Cities..."}))

    try {
      let formData = new FormData();
      formData.append('file', file);

      let result: any = await uploadCities({
        data: formData
      });

      if(result.success) {
        dispatch(showToast(successToast(`${result.itemsUploaded} Cities uploaded successfully`)))
        getCityList(1, DEFAULT_ITEMS_COUNT);
      }
      else {
        dispatch(showToast(failedToast('Uploading cities failed')))
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
        onPageChange={getCityList}
        onItemsCountChange={getCityList}
        onSearch={handleSearch}
        onImportCSV={handleImportCity}
        importSampleLink={`${SERVER_URL}/files/csv/import-city.csv`}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Code</THead>
            <THead>Name</THead>
            <THead>Province Code</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody className="text-sm">
          {cities.map((item, index) => (
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
