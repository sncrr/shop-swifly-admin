import { createQuery, request } from "../../utils/requestUtils";
import { Paginate } from "../../types/Utils/Paginate";
import { Customer } from "../../models/Customer";

const SUB_PATH = 'customers';

export async function getAllCustomers(query: string) {
  try {
    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPaginateCustomers(
  page: number,
  itemsCount: number,
  sort: string,
  search: string
): Promise<Paginate<Customer>> {
  try {
    const query = createQuery({
      populate: "",
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

export async function getCustomer(id: string): Promise<Customer> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCustomer(payload: any): Promise<Customer> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomer(
  id: string,
  payload: any
): Promise<Customer> {
  try {
    const response = await request.put(`/${SUB_PATH}/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCustomer(id: string): Promise<boolean> {
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
