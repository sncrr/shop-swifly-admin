import { Category } from "../../types/Inventory/Category";

export const organizeByParent = (list: Category[]): any[] => {

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