import { request } from "../../utils/requestUtils";

const SUB_PATH = 'settings';

export async function getSettingsByGroup(payload: any): Promise<any> {
  try {
    const response = await request.post(`/${SUB_PATH}/section`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function saveSettings(payload: any): Promise<any> {
  try {
    const response = await request.post(`/${SUB_PATH}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
