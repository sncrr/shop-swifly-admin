import { PaymentMethod } from "../../models/PaymentMethod";
import { createQuery, request } from "../../utils/requestUtils";

const SUB_PATH = 'payment-methods';

export async function getAllPaymentMethods(payload: any) {
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

export async function getPaymentMethod(id: string): Promise<PaymentMethod> {
  try {
    const response = await request.get(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createPaymentMethod(payload: any): Promise<PaymentMethod> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePaymentMethod(payload: any): Promise<PaymentMethod> {
  try {
    const response = await request.put(`/${SUB_PATH}/${payload.id}`, payload.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePaymentMethod(id: string): Promise<boolean> {
  try {
    const response = await request.delete(`/${SUB_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
