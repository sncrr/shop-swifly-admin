import axios from "axios";
import { API_URL } from "../constants/global-constant";
import { Category } from "../types/Inventory/Category";

export async function getAllCategories() {
  try {
    const response = await axios.get(`${API_URL}/category/all`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function getCategory(id: string) : Promise<Category> {
  try {
    const response = await axios.get(`${API_URL}/category/${id}`)
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function createCategory (payload: any) : Promise<Category> {
  try {
    const response = await axios.post(
      `${API_URL}/category`, 
      payload.data
    );
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}

export async function updateCategory(payload:any) : Promise<Category> {
  try {
    const response = await axios.put(
      `${API_URL}/category/${payload.id}`, 
      payload.data
    );
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}

export async function deleteCategory(id:string) : Promise<boolean> {
  try {
    const response = await axios.delete(`${API_URL}/category/${id}`);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}