// Save the access token to a secure HttpOnly cookie
import { setCookie, parseCookies, destroyCookie } from "nookies";
// import * as jwt from 'jose'

const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export function setAccessToken(token: string) {
  setCookie(null, ACCESS_TOKEN_COOKIE_NAME, token, {
    // maxAge: 3600, // Set the cookie expiration time in seconds (e.g., 1 hour)
    maxAge: 2851200,
    path: "/",
  });
}

export function getAccessToken(): string {
  const accessToken = parseCookies()[ACCESS_TOKEN_COOKIE_NAME];
  // const verifyToken = await AdminController.verifyJWT(accessToken);

  return accessToken;
}

export function removeAccessToken() {
  destroyCookie(null, ACCESS_TOKEN_COOKIE_NAME);
}
