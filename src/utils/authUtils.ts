// Save the access token to a secure HttpOnly cookie
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { AdminController } from '../controllers';
import { setUser } from '../root/slices/userSlice';
// import * as jwt from 'jose'

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

export function setAccessToken (token: string) {
  setCookie(null, ACCESS_TOKEN_COOKIE_NAME, token, {
    maxAge: 3600, // Set the cookie expiration time in seconds (e.g., 1 hour)
    path: '/',
  });
};

export async function getAccessToken (): Promise<string> {
  const accessToken = parseCookies()[ACCESS_TOKEN_COOKIE_NAME];
  // const verifyToken = await AdminController.verifyJWT(accessToken);
  
  return accessToken;
};

export function removeAccessToken () {
  destroyCookie(null, ACCESS_TOKEN_COOKIE_NAME);
};

export function onSuccessLogin (dispatch:any, accessToken:string) {

  dispatch(setUser(accessToken));
  setAccessToken(accessToken);
}

export function onLogout (dispatch:any) {
  dispatch(setUser(null));
  removeAccessToken()
}