import { Product } from "../../types/Inventory/Product";
import { formRequest, request } from "../../controllers/request";
import { createQuery } from "../../utils/requestUtils";

export async function getAllProducts() {
  try {
    // const query = createQuery({
    //   populate: 'categories',
    //   sort: 'name'
    // });

    const response = await request.get(`/product/all`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function getProduct(id: string) : Promise<Product> {
  try {
    const response = await request.get(`/product/${id}`)
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

export async function createProduct (payload: any) : Promise<Product> {
  try {
    const response = await request.post(
      `/product`, 
      payload,
    );
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}

export async function updateProduct(payload:any) : Promise<Product> {
  try {
    const response = await request.put(
      `/product/${payload.id}`, 
      payload.data
    );
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}

export async function deleteProduct(id:string) : Promise<boolean> {
  try {
    const response = await request.delete(`/product/${id}`);
    return response.data;
  } 
  catch (error) {
    throw error;
  }
}