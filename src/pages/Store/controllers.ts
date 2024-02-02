import { Store } from "../../models/Store";
import { createQuery, request } from "../../utils/requestUtils";

export async function getAllStores() {
  try {
    const query = createQuery({
      populate: "parent",
      sort: "name",
    });

    const response = await request.get(`/store/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getStore(id: string): Promise<Store> {
  try {
    const response = await request.get(`/store/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createStore(payload: any): Promise<Store> {
  try {
    const response = await request.post(`/store`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStore(payload: any): Promise<Store> {
  try {
    const response = await request.put(`/store/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStore(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/store/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
