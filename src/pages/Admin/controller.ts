import axios from "axios";
import { response } from "../../utils";
import { SERVER_URL } from "../../constants/global";

export const authenticate = async (
  username: string,
  password: string
): Promise<any> => {
  let result;

  await axios
    .post(`${SERVER_URL}/admin/login`, {
      username,
      password,
    })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.error(err);
      result = response.internalError(err);
    });

  return result;
};

export const verifyJWT = async (token: string): Promise<any> => {
  let result;

  await axios
    .get(`${SERVER_URL}/admin/verify_token/${token}`)
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.error(err);
      result = response.internalError(err);
    });

  return result;
};
