import { Category } from "../../models/Category";
import { createQuery, request } from "../../utils/requestUtils";

const SUB_PATH = 'categories';

export async function getAllCategories(payload: any) {
  try {
    
    const query = createQuery(payload);

    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCategory(id: string): Promise<Category> {
  try {
    const query = createQuery({
      populate: "parent",
      sort: "name",
    });

    const response = await request.get(`/${SUB_PATH}/${id}?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCategory(payload: any): Promise<Category> {
  try {
    const query = createQuery({
      populate: "parent",
    });
    const response = await request.post(`/${SUB_PATH}?${query}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCategory(payload: any): Promise<Category> {
  try {
    const query = createQuery({
      populate: "parent",
    });
    const response = await request.put(
      `/${SUB_PATH}/${payload.id}?${query}`,
      payload.data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
