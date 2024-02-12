import { Province } from "../../../models/Address";
import { createQuery, request } from "../../../utils/requestUtils";

const SUB_PATH = 'address/provinces';

export async function getAllProvinces(payload: any) {
  try {
    const query = createQuery({
      ...payload
    });

    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProvince(id: string): Promise<Province> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createProvince(payload: any): Promise<Province> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProvince(payload: any): Promise<Province> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function importProvinces(payload: any): Promise<Province> {
  try {
    const response = await request.post(`/${SUB_PATH}/import`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProvince(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
