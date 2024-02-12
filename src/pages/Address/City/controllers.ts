import { City } from "../../../models/Address";
import { createQuery, request } from "../../../utils/requestUtils";

const SUB_PATH = 'address/cities';

export async function getAllCities(payload: any) {
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

export async function getCity(id: string): Promise<City> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCity(payload: any): Promise<City> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCity(payload: any): Promise<City> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function importCities(payload: any): Promise<City> {
  try {
    const response = await request.post(`/${SUB_PATH}/import`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCity(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
