import axios, { AxiosInstance } from "axios";
import { getAccessToken } from "../utils/authUtils";
import { API_URL } from "../constants/global";

export const request: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export const createQuery = (options: any) => {
  const queryStringArray: string[] = [];

  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const value = options[key];

      // Replace spaces with '+' in the value
      if (value != undefined && value != "" && value != null) {
        const formattedValue = String(value).replace(/ /g, "+");
        queryStringArray.push(`${key}=${formattedValue}`);
      }
    }
  }

  return queryStringArray.join("&");
};
