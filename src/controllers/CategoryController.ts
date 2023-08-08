import axios from "axios";
import { API_URL } from "../constants/global-constant";
import { Category } from "../types/Category";

export async function getAllCategories() : Promise<Category[]> {
  
  let result = new Array<Category>()

  await axios.get(`${API_URL}/category/all`)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
  
    return result;
}

export async function getCategory(id: string) : Promise<Category> {
  
  let result : Category = {};

  await axios.get(`${API_URL}/category/${id}`)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
  
    return result;
}

export async function createCategory (payload: any) : Promise<Category> {
  let result : Category = {}

  await axios.post(`${API_URL}/category`, payload)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
  
    return result;
}

export async function updateCategory(id:string, payload:any) : Promise<Category> {
  let result : Category = {}

  await axios.put(`${API_URL}/category/${id}`, payload)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
  
    return result;
}