import { Store } from "../../models/Store";
import { Paginate } from "../../types/Utils/Paginate";
import { createQuery, request } from "../../utils/requestUtils";

const SUB_PATH = 'stores';

export async function getAllStores() {
  try {
    const query = createQuery({
      populate: "parent",
      sort: "name",
    });

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
): Promise<Paginate<Store>> {
  try {
    const query = createQuery({
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

export async function getStore(id: string): Promise<Store> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createStore(payload: any): Promise<Store> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStore(payload: any): Promise<Store> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStore(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
