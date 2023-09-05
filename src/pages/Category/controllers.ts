import { Category } from "../../types/Inventory/Category";
import { request } from "../../controllers/request";
import { createQuery } from "../../utils/requestUtils";

export async function getAllCategories() {
  try {
    const query = createQuery({
      populate: 'parent',
      sort: 'name'
    });

    const response = await request.get(`/category/all?${query}`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function getCategory(id: string) : Promise<Category> {
  try {
    const response = await request.get(`/category/${id}`)
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function createCategory (payload: any) : Promise<Category> {
  try {
    const response = await request.post(
      `/category`, 
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
    const response = await request.put(
      `/category/${payload.id}`, 
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
    const response = await request.delete(`/category/${id}`);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}