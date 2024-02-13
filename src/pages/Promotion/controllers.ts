import { Promotion } from "../../models/Promotion";
import { createQuery, request } from "../../utils/requestUtils";

const SUB_PATH = 'promotions';

export async function getAllPromotions(payload: any) {
  try {
    
    const query = createQuery(payload);

    const response = await request.get(`/${SUB_PATH}/all?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPromotion(id: string): Promise<Promotion> {
  try {
    const query = createQuery({});

    const response = await request.get(`/${SUB_PATH}/${id}?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createPromotion(payload: any): Promise<Promotion> {
  try {
    const query = createQuery({});
    const response = await request.post(`/${SUB_PATH}?${query}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePromotion(payload: any): Promise<Promotion> {
  try {
    const query = createQuery({});
    const response = await request.put(
      `/${SUB_PATH}/${payload.id}?${query}`,
      payload.data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePromotion(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function importPromotionProducts(payload: any): Promise<boolean> {
  try {
    const response = await request.post(`/${SUB_PATH}/products/import`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
