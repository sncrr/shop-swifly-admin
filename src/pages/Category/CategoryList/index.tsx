import { NavigateFunction, useNavigate } from "react-router-dom";
import { Category } from "../../../types/Inventory/Category";
import { TableControls } from "../../../components/tables/TableControls";
import { TBody, TData, THead, THeader, TRow, Table } from "../../../components/tables";
import { CaretDownFill, CaretRightFill, ChevronCompactDown, ChevronCompactRight } from "../../../assets/svgs/Icons";
import { FormCheckBox, FormToggle } from "../../../components/forms";
import { organizeByParent } from "../helpers";
import RowActions from "../../../components/tables/RowActions";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { saveCategory } from "../actions";

interface Props {
  categories: Category[],
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
}
const CategoryList = (props: Props) => {

  const organizedList = organizeByParent(props.categories);

  const handleEdit = (id: any) => {
    props.navigate(`/admin/category/edit/${id}`);
  }

  const handleDelete = (id: any) => {

  }

  return (
    <div>
      <TableControls
        singleColumn
        hasEditColumn={false}
        hasFilter={false}
        hasPageNavigation={false}
        hasPageItemCount={false}
        hasTableActions={false}
      />
      <Table>
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
          <TRow>
            <TData>
              <CaretDownFill />
            </TData>
            <TData>Default Categories</TData>
          </TRow>
          {
            organizedList.map((item) => (
              <CategoryRow 
                key={item._id} 
                item={item} 
                tabCount={0}
                dispatch={props.dispatch}
              />
            ))
          }
        </TBody>
      </Table>
    </div>
  )
}

interface CategoryRowProps {
  item: Category;
  tabCount: number;
  dispatch: Dispatch<AnyAction>
}
const CategoryRow = (props : CategoryRowProps) => {

  const {
    item,
    tabCount,
    dispatch
  } = props;

  const children = item.children;

  const [showChildren, setShowChildren] = useState(false);

  const handleShowChildren  = () => {
    setShowChildren(!showChildren)
  }

  const handleOnChangeStatus = (e : ChangeEvent<HTMLInputElement>) => {

    dispatch(saveCategory({
      id: item._id,
      data: {
        isEnabled: e.target.checked
      }
    }))
  }

  return (
    <>
      <TRow>
        <TData>
          <FormCheckBox />
        </TData>
        <TData>
          <div className="flex" style={{paddingLeft: `${tabCount * 1.5}rem`}}>
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
        <TData></TData>
        <TData>
          <FormToggle
            inputProps={{
              defaultChecked: item.isEnabled,
              onChange: handleOnChangeStatus
            }}
            rounded
          />
        </TData>
        <TData>
          <RowActions />
        </TData>
      </TRow>

      {
        showChildren && children && children.map((child) => (
          <CategoryRow 
            key={child._id} 
            item={child} 
            tabCount={tabCount + 1} 
            dispatch={dispatch}
          />
        ))
      }

    </>
  )
}

export default CategoryList;