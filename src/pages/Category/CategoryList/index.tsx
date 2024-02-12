//UTILS
import { useEffect, useState } from "react";
import { Category } from "../../../models/Category";
import { getRowStatus, organizeByParent, setRowStatus } from "../helpers";
import { Paths } from "../../../constants";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { deleteCategory, fetchCategories, saveCategory } from "../slice";

//COMPONENTS
import { CaretRightFill } from "../../../assets/svgs/Icons";
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
import { NavigateFunction, useOutletContext } from "react-router-dom";
import { Checkbox } from "../../../components/inputs/Checkbox";
import { Section } from "../../../components/containers";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { getLocalData, setLocalData } from "../../../root/helper";
import { CATEGORY_LOCAL_KEY } from "../../../constants/global";
import { CategoryContext } from "..";

const CategoryList = () => {
  const { dispatch, navigate, categoryState } =
    useOutletContext<CategoryContext>();

  //HOOKS & VARIABLES
  const localData = getLocalData(CATEGORY_LOCAL_KEY);
  const { search } = localData;
  const { fetching, categories, hasChanges } = categoryState;

  const organizedDefault = fetching ? [] : organizeByParent(categories);

  useEffect(() => {
    getCategoryList()
  }, []);

  useEffect(() => {
    if (hasChanges && !fetching) {
      getCategoryList();
    }
  }, [hasChanges, fetching]);

  const getCategoryList = (searchValue?: string) => {
    dispatch(fetchCategories({
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
    getCategoryList(value);
  };

  return (
    <Section>
      <TableControls
        singleColumn
        hasEditColumn={false}
        hasFilter={false}
        hasPageNavigation={false}
        hasPageItemCount={false}
        hasTableActions={false}
        defaultSearchValue={search}
        onSearch={handleSearch}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead fixWidth width="1rem"></THead>
            <THead>Name</THead>
            <THead>ID</THead>
            <THead>Products</THead>
            <THead>Subcategories</THead>
            <THead>Is Enabled</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody>
          {organizedDefault.map((item) => (
            <CategoryRow
              key={item._id}
              item={item}
              tabCount={0}
              hasCheckbox
              dispatch={dispatch}
              navigate={navigate}
            />
          ))}
        </TBody>
      </Table>
    </Section>
  );
};

interface CategoryRowProps {
  item: Category;
  hasCheckbox: boolean;
  tabCount: number;
  dispatch: Dispatch<AnyAction>;
  navigate: NavigateFunction;
}

const CategoryRow = (props: CategoryRowProps) => {
  const { item, tabCount, dispatch, navigate, hasCheckbox } = props;

  const children = item.children;

  const [showChildren, setShowChildren] = useState(!!getRowStatus(item._id));

  const handleShowChildren = () => {
    setShowChildren(!showChildren);

    //Retain the status of row even if refresh
    setRowStatus(item._id, !showChildren);
  };

  const handleOnChangeStatus = (value: boolean) => {
    dispatch(
      saveCategory({
        id: item._id,
        data: {
          isEnabled: value,
        },
      })
    );
  };

  const handleEdit = () => {
    navigate(`${Paths.CATEGORY}/edit/${item._id}`);
  };

  const handleDelete = () => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this category?",
      onConfirm: () => dispatch(deleteCategory(item._id)),
    });
  };

  const rowButtons = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <TRow>
        <TData>{hasCheckbox && <input type="checkbox" />}</TData>
        <TData>
          <div className="flex" style={{ marginLeft: `${tabCount * 1.5}rem` }}>
            {children && children.length > 0 ? (
              <span onClick={handleShowChildren}>
                <div
                  className={`pt-1 transition-transform ${
                    showChildren ? "rotate-90" : ""
                  }`}
                >
                  <CaretRightFill />
                </div>
              </span>
            ) : (
              <span className="w-4"></span>
            )}
            <span className="pl-2">{item.name}</span>
          </div>
        </TData>
        <TData>{item._id}</TData>
        <TData>{item.productCount ? item.productCount : ''}</TData>
        <TData>{item.children?.length}</TData>
        <TData>
          <Checkbox
            defaultValue={item.isEnabled}
            onSubmit={handleOnChangeStatus}
          />
        </TData>
        <TData>
          <RowActions buttons={rowButtons} />
        </TData>
      </TRow>

      {showChildren &&
        children &&
        children.map((child) => (
          <CategoryRow
            key={child._id}
            item={child}
            hasCheckbox
            tabCount={tabCount + 1}
            dispatch={dispatch}
            navigate={navigate}
          />
        ))}
    </>
  );
};

export default CategoryList;
