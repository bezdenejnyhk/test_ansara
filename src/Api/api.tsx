import Cookies from "js-cookie";

const URL = "https://ansaratracker.ru/newapi";
const headersWithContentType = { "Content-Type": "application/json" };

const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${Cookies.get("accessToken")}`,
});

const responseCheck = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

//login
export function signIn(username: string, password: string) {
  return fetch(`${URL}/authorize`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//регистрация
export function signUp(username: string, password: string) {
  return fetch(`${URL}/signup`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//Получение всех задач
export function getTasksApi() {
  return fetch(`${URL}/Task`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}
