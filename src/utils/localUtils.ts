import { DEFAULT_LOCAL_DATA } from "../constants/global";
import { LocalData } from "../types/Utils/Paginate";

export const getProductLocalData = (key: string): LocalData => {
    let data = localStorage.getItem(key);
  
    if (data) {
      return JSON.parse(data);
    }
    else {
      return DEFAULT_LOCAL_DATA
    }
  }
  
  export const setProductLocalData = (key: string, data: any) => {
  
    let current = getProductLocalData(key);
    let value = { ...current, ...data };
  
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }