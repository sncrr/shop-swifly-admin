//UTILS
import { useEffect } from "react";
import { deletePromotion, fetchPromotions, savePromotion, } from "../slice";

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
import { useOutletContext } from "react-router-dom";
import { Section } from "../../../components/containers";
import { getErrorMessage, getLocalData, setLocalData } from "../../../root/helper";
import { CATEGORY_LOCAL_KEY, SERVER_URL } from "../../../constants/global";
import { PromotionContext } from "..";
import { Checkbox } from "../../../components/inputs/Checkbox";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { failedToast, showToast, successToast } from "../../../components/toasts/slice";
import { importPromotionProducts } from "../controllers";
import { showConfirmDialog } from "../../../components/alerts/actions";

const PromotionList = () => {
  const { dispatch, navigate, promotionState } =
    useOutletContext<PromotionContext>();

  //HOOKS & VARIABLES
  const localData = getLocalData(CATEGORY_LOCAL_KEY);
  const { search } = localData;
  const { fetching, promotions, hasChanges } = promotionState;

  useEffect(() => {
    getPromotionList()
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getPromotionList();
    }
  }, [hasChanges, fetching]);

  const getPromotionList = (searchValue?: string) => {
    dispatch(fetchPromotions({
      query: {
        search: searchValue != undefined ? searchValue : search,
        countProducts: 1,
        sort: 'name'
      }
    }));

    setLocalData(CATEGORY_LOCAL_KEY, {
      search: searchValue,
    });
  }
  const handleSearch = (value: string) => {
    getPromotionList(value);
  };

  const handleEdit = (id: any) => {
    navigate(`/admin/promotions/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this promotion?",
      onConfirm: () => dispatch(deletePromotion(id)),
    });
  };

  const handleOnChangeStatus = (id: string, value: boolean) => {
    dispatch(
      savePromotion({
        id,
        data: {
          isEnabled: value,
        },
      })
    );
  };

  const handleImportProducts = async (file: any) => {
    dispatch(showLoader({text: "Uploading Promotion Products..."}))

    try {
      let formData = new FormData();
      formData.append('file', file);

      let result: any = await importPromotionProducts({
        data: formData
      });

      if(result.success) {
        dispatch(showToast(successToast(`${result.itemsUploaded} products uploaded successfully`)))
        getPromotionList();
      }
      else {
        dispatch(showToast(failedToast('Uploading products failed')))
      }
      
    } catch (error: any) {
      dispatch(showToast(failedToast(getErrorMessage(error))))
    }

    dispatch(hideLoader())
  }

  return (
    <Section>
      <TableControls
        singleColumn
        hasImportCSV
        hasEditColumn={false}
        hasFilter={false}
        hasPageNavigation={false}
        hasPageItemCount={false}
        hasTableActions={false}
        defaultSearchValue={search}
        onSearch={handleSearch}
        onImportCSV={handleImportProducts}
        importSampleLink={`${SERVER_URL}/files/csv/import-promotion-products.csv`}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead fixWidth width="1rem"></THead>
            <THead>Name</THead>
            <THead>Code</THead>
            <THead>Product Count</THead>
            <THead>Is Enable</THead>
            <THead>Start Date</THead>
            <THead>End Date</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody>
          {
            promotions.map((item, index) => (
              <TRow key={index}>
                <TData>
                  <input type="checkbox" />
                </TData>
                <TData>{item.name}</TData>
                <TData>{item.code}</TData>
                <TData>{item.products.length}</TData>
                <TData>
                  <Checkbox
                    defaultChecked={item.isEnabled}
                    onSubmit={(value: boolean) => handleOnChangeStatus(item._id, value)}
                  />
                </TData>
                <TData>{item.startDate}</TData>
                <TData>{item.endDate}</TData>
                <TData>
                <RowActions
                  buttons={[
                    { label: "Edit", onClick: () => handleEdit(item._id) },
                    { label: "Delete", onClick: () => handleDelete(item._id) },
                  ]}
                />
              </TData>
              </TRow>
            ))
          }
        </TBody>
      </Table>
    </Section>
  );
};


export default PromotionList;
