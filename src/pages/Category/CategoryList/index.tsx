import { NavigateFunction } from "react-router-dom";
import { Category } from "../../../types/Inventory/Category";
import { RowActions, TBody, TData, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";
import { CaretRightFill } from "../../../assets/svgs/Icons";
import { FormCheckBox, FormToggle } from "../../../components/forms";
import { getRowStatus, organizeByParent, setRowStatus } from "../helpers";
import { ChangeEvent, useState } from "react";
import { deleteCategory, saveCategory } from "../actions";
import { Paths } from "../../../constants";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Section } from "../../../components/containers";
import { CategoryState } from "../reducers";

interface Props {
  categoryState: CategoryState,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
}
const CategoryList = (props: Props) => {

  const {
    loading,
    categories
  } = props.categoryState;
  const organizedDefault = loading ? [] : organizeByParent(categories);
  const organizedPromotion = [];

  return (
    <Section>
      <TableControls
        singleColumn
        hasEditColumn={false}
        hasFilter={false}
        hasPageNavigation={false}
        hasPageItemCount={false}
        hasTableActions={false}
      />
      <Table isLoading={loading}>
        <THeader>
          <TRow>
            <THead fixWidth width="1rem"></THead>
            <THead>Name</THead> 
            <THead>Products</THead>
            <THead>Subcategories</THead>
            <THead>Is Enabled</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody>

          {/* <CategoryRow
            item={{
              _id: "Default",
              name: "Default Categories",
              children: organizedDefault,
            }}
            hasCheckbox={false}
            tabCount={-1.5}
            dispatch={props.dispatch}
            navigate={props.navigate}
          />
          <CategoryRow
            item={{
              _id: "Promotions",
              name: "Promotions",
              children: organizedPromotion,
            }}
            hasCheckbox={false}
            tabCount={-1.5}
            dispatch={props.dispatch}
            navigate={props.navigate}
          /> */}
          {
            organizedDefault.map((item) => (
              <CategoryRow 
                key={item._id} 
                item={item} 
                tabCount={0}
                hasCheckbox
                dispatch={props.dispatch}
                navigate={props.navigate}
              />
            ))
          }
        </TBody>
      </Table>
    </Section>
  )
}

interface CategoryRowProps {
  item: Category;
  hasCheckbox: boolean,
  tabCount: number;
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
}
const CategoryRow = (props : CategoryRowProps) => {

  const {
    item,
    tabCount,
    dispatch,
    navigate,
    hasCheckbox
  } = props;

  const children = item.children;

  const [showChildren, setShowChildren] = useState(!!getRowStatus(item._id));

  const handleShowChildren  = () => {
    setShowChildren(!showChildren)
    //Retain the status of row even if refresh
    setRowStatus(item._id, !showChildren)
  }

  const handleOnChangeStatus = (e : ChangeEvent<HTMLInputElement>) => {

    dispatch(saveCategory({
      id: item._id,
      data: {
        isEnabled: e.target.checked
      }
    }))
  }

  const handleEdit = () => {
    navigate(`${Paths.CATEGORY}/edit/${item._id}`)
  }

  const handleDelete = () => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this category?",
      onConfirm: () => dispatch(deleteCategory(item._id))
    })
  }

  const rowButtons = [
    {
      label: "Edit",
      onClick: handleEdit
    },
    {
      label: "Delete",
      onClick: handleDelete
    }
  ];

  // const indentSize = "-3rem";

  return (
    <>
      <TRow>
        <TData>
          {
            hasCheckbox && <input type="checkbox" />
          }
        </TData>
        <TData>
          <div className="flex" style={{marginLeft: `${tabCount * 1.5}rem`}}>
            {
              (children && children.length > 0) ? (
                <span onClick={handleShowChildren}>
                  <div className={`pt-1 transition-transform ${showChildren ? 'rotate-90' : ''}`}>
                    <CaretRightFill />
                  </div>
                </span>
              ) : (
                <span className="w-4"></span>
              )
            }
            <span className="pl-2">{item.name}</span>
          </div>
        </TData>
        <TData></TData>
        <TData>{item.children?.length}</TData>
        <TData>
          {/* <FormToggle
            inputProps={{
              defaultChecked: item.isEnabled,
              onChange: handleOnChangeStatus
            }}
            rounded
          /> */}
        </TData>
        <TData>
          <RowActions

            buttons={rowButtons}
          />
        </TData>
      </TRow>

      {
        showChildren && children && children.map((child) => (
          <CategoryRow 
            key={child._id} 
            item={child} 
            hasCheckbox
            tabCount={tabCount + 1} 
            dispatch={dispatch}
            navigate={navigate}
          />
        ))
      }

    </>
  )
}

export default CategoryList;