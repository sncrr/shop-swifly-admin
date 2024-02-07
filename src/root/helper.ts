import { get } from "lodash";
import { DEFAULT_LOCAL_DATA } from "../constants/global";
import { LocalData } from "../types/Utils/Paginate";

export const getLocalData = (key: string): LocalData => {
  let data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return DEFAULT_LOCAL_DATA;
  }
};

export const setLocalData = (key: string, data: any) => {
  let current = getLocalData(key);
  let value = { ...current, ...data };

  localStorage.setItem(key, JSON.stringify(value));
};

export const getErrorMessage = (error: any) => {
  return get(error, 'response.data.message', '');
}
