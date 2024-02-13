const PROMOTION_ROW_KEY = "catTblRowSts";

//Use to retain the status of row even if refresh
export const setRowStatus = (id: any, value: boolean) => {
  let numValue = value ? 1 : 0;

  let status: any = localStorage.getItem(PROMOTION_ROW_KEY);

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

    if (!found) status = [...status, { id, value: numValue }];
  } else status = [{ id, value: numValue }];

  localStorage.setItem(PROMOTION_ROW_KEY, JSON.stringify(status));
};

//Use to retain the status of row even if refresh
export const getRowStatus = (id: any) => {
  let status: any = localStorage.getItem(PROMOTION_ROW_KEY);
  if (status) {
    status = JSON.parse(status);

    for (let item of status) if (item.id == id) return parseInt(item.value);
  }

  return 0;
};
