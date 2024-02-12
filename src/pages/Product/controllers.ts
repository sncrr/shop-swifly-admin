import { createQuery, request } from "../../utils/requestUtils";
import { Paginate } from "../../types/Utils/Paginate";
import { Product } from "../../models/Product";

const SUB_PATH = 'products';

export async function getAllProducts(query: string) {
  try {
    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPaginateProducts(
  page: number,
  itemsCount: number,
  sort: string,
  search: string
): Promise<Paginate<Product>> {
  try {
    const query = createQuery({
      populate: "categories",
      sort,
      search,
      page,
      itemsCount,
    });

    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(payload: any): Promise<Product> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  id: string,
  payload: any
): Promise<Product> {
  try {
    const response = await request.put(`/${SUB_PATH}/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const importProducts = async (payload: any): Promise<Product> => {
  try {
    const response = await request.post(`/${SUB_PATH}/import`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function generateNewSku(): Promise<string> {
  try {
    const response = await request.get(`/${SUB_PATH}/sku`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

