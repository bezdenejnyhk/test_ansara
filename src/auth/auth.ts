import Cookies from 'js-cookie'

export const authTokenKey = "accessToken";

export const getAuthToken = (): string => {
  return Cookies.get(authTokenKey) || "";
}

export const setAuthToken = (token: string) => {
  Cookies.set(authTokenKey, token)
}

export const clearAuthToken = () => {
  Cookies.remove(authTokenKey);
}
