import { get } from "lodash";
import { DATETIME_FORMAT, DEFAULT_LOCAL_DATA } from "../constants/global";
import { LocalData } from "../types/Utils/Paginate";
import moment from "moment";

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

export const formatDateTime = (dateTime: string) => {
  return moment(dateTime).format(DATETIME_FORMAT);
}


export const generateCodeFromName = (name: string): string => {
  let code = '';
  if (name) {
    // Convert to lowercase and replace spaces with underscores
    code = name.toLowerCase().replace(/\s+/g, '_');
  }
  return code;
};
