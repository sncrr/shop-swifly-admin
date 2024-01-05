import { isArray } from "lodash";
import { Category } from "../../types/Inventory/Category";

export const organizeByParent = (list: Category[]): any[] => {

  if(!isArray(list)) return [];

  let data = list.map(item => ({ ...item }));
  let organizedData: any[] = [];

  const findParent = (itemId: string): any => {
    let parent = data.find(item => item._id === itemId);
    return parent;
  };

  data.forEach(item => {
    if (!item.parent) {
      if (!organizedData.some(existingItem => existingItem._id === item._id)) {
        organizedData.push(item);
      }
    } else {

      //Get parent
      let parent = findParent(item.parent._id);

      // Create children
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        if (!parent.children.some((child: any) => child._id === item._id)) {
          parent.children.push(item);
        }
      }
    }
  });

  return organizedData;
}


const CATEGORY_ROW_KEY = "catTblRowSts";

//Use to retain the status of row even if refresh
export const setRowStatus = (id: any, value: boolean) => {

  let numValue = value ? 1 : 0;

  let status: any = localStorage.getItem(CATEGORY_ROW_KEY);

  if (status) {
    status = JSON.parse(status);
    let found = false;
    for (let item of status) {
      if (item.id == id) {
        item.value = numValue;
        found = true;
        break;
      }
    }

    if (!found)
      status = [...status, { id, value: numValue }]
  }
  else
    status = [{id, value: numValue}];

  localStorage.setItem(CATEGORY_ROW_KEY, JSON.stringify(status));
}

//Use to retain the status of row even if refresh
export const getRowStatus = (id: any) => {

  let status: any = localStorage.getItem(CATEGORY_ROW_KEY);
  if (status) {
    status = JSON.parse(status);

    for (let item of status) 
      if (item.id == id) 
        return parseInt(item.value)
  }

  return 0;
}