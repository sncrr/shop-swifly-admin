import { createQuery, request } from "../../utils/requestUtils";
import { Paginate } from "../../types/Utils/Paginate";
import { Product } from "../../models/Product";

export async function getAllProducts(query: string) {
  try {
    const response = await request.get(`/product/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPaginateProducts(
  page: number,
  itemsCount: number,
  sort: string,
  order: string,
  search: string
): Promise<Paginate<Product>> {
  try {
    const query = createQuery({
      populate: "categories",
      sort,
      order,
      search,
      page,
      itemsCount,
    });

    const response = await request.get(`/product/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await request.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(payload: any): Promise<Product> {
  try {
    const response = await request.post(`/product`, payload);
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
    const response = await request.put(`/product/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function generateNewSku(): Promise<string> {
  try {
    const response = await request.get(`/product/sku`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
