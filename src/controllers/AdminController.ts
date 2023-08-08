
import axios from "axios"
import { GlobalConstants } from "../constants";
import { response } from "../utils";

export const authenticate = async (username:string, password:string): Promise<any> => {
  
  let result;

  await axios
    .get(`${GlobalConstants.BASE_URL}/admin/auth`,{
      params: {username, password}
    })
    .then((res) => {
      result = res.data
    })
    .catch((err)=> {
      console.error(err)
      result = response.internalError(err)
    })
  
  return result;

}


export const verifyJWT = async (token:string): Promise<any> => {
  
  let result;

  await axios
    .get(`${GlobalConstants.BASE_URL}/admin/verify_token/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      result = res.data
    })
    .catch((err)=> {
      console.error(err)
      result = response.internalError(err)
    })
  
  return result;

}