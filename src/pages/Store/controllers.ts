import { request } from "../../controllers/request";
import { createQuery } from "../../utils/requestUtils";

export async function getAllStore() {
  try {

    const query = createQuery({
      page: 1,
      itemsCount: 10
    })
    const response = await request.get(`/store/all?${query}`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}
