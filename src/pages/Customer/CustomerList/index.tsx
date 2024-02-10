import { useOutletContext } from "react-router-dom";
import { Section } from "../../../components/containers";
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
import { CUSTOMER_LOCAL_KEY } from "../../../constants/global";
import { formatDateTime, getLocalData, setLocalData } from "../../../root/helper";
import { GetList, LocalData } from "../../../types/Utils/Paginate";
import { CustomerContext } from "..";
import { useEffect } from "react";
import { deleteCustomer, fetchCustomers } from "../slice";
import { showConfirmDialog } from "../../../components/alerts/actions";

const CustomerList = () => {

  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(CUSTOMER_LOCAL_KEY);

  const { dispatch, navigate, customerState } =
  useOutletContext<CustomerContext>();

  const { 
    fetching, 
    totalPages, 
    totalItems, 
    hasChanges,
    customers,
  } = customerState;

  useEffect(() => {
    getCustomerList({});
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getCustomerList({});
    }
  }, [hasChanges, fetching])

  //FUNCTIONS
  const getCustomerList = async ({
    page = localData.currentPage, 
    itemsCount = localData.itemsCount, 
    search = localData.search
  }: GetList) => {
    dispatch(
      fetchCustomers({
        page,
        itemsCount,
        sort: JSON.stringify([["createdAt", "desc"]]),
        search: search,
      })
    );

    setLocalData(CUSTOMER_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
      search: search,
    });
  }

  const handleEdit = (id: any) => {
    navigate(`/admin/customers/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this customer?",
      onConfirm: () => dispatch(deleteCustomer(id)),
    });
  };

  const handleSearch = (value: string) => {
    getCustomerList({search: value});
  };

  return (
    <Section>
      <TableControls
        hasSearch
        defaultSearchValue={localData.search}
        totalPages={totalPages}
        totalRows={totalItems}
        defaultCurrentPage={localData.currentPage}
        defaultPageItemsCount={localData.itemsCount}
        onRefreshList={getCustomerList}
        onSearch={handleSearch}
      />
      <Table>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>First Name</THead>
            <THead>Last Name</THead>
            <THead>Email</THead>
            <THead>Birthday</THead>
            <THead>Created At</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody>
        {customers.map((item, index) => (
            <TRow key={index}>
              <TData>
                <input type="checkbox" />
              </TData>
              <TData>{item.firstName}</TData>
              <TData>{item.lastName}</TData>
              <TData>{item.email}</TData>
              <TData>{item.dateOfBirth}</TData>
              <TData>
                {formatDateTime(item.createdAt)}
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
};

export default CustomerList;
