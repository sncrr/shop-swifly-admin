import { request } from "../../utils/requestUtils";

export async function getSettingsByGroup(payload: any): Promise<any> {
  try {
    const response = await request.post(`/settings/section`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function saveSettings(payload: any): Promise<any> {
  try {
    const response = await request.post(`/settings`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
