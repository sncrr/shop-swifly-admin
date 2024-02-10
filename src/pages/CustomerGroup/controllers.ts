import { CustomerGroup } from "../../models/CustomerGroup";
import { createQuery, request } from "../../utils/requestUtils";

const SUB_PATH = 'customer-groups';

export async function getAllCustomerGroups(payload: any) {
  try {
    const query = createQuery({
      sort: "name",
      search: payload.search,
    });

    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerGroup(id: string): Promise<CustomerGroup> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCustomerGroup(payload: any): Promise<CustomerGroup> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomerGroup(payload: any): Promise<CustomerGroup> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCustomerGroup(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
