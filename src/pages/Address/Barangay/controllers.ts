import { Barangay } from "../../../models/Address";
import { createQuery, request } from "../../../utils/requestUtils";

const SUB_PATH = 'address/barangays';

export async function getAllBarangays(payload: any) {
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

export async function getBarangay(id: string): Promise<Barangay> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createBarangay(payload: any): Promise<Barangay> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateBarangay(payload: any): Promise<Barangay> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadBarangays(payload: any): Promise<Barangay> {
  try {
    const response = await request.post(`/${SUB_PATH}/upload`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBarangay(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
