import Cookies from "js-cookie";
import { TTaskCreate } from '../types/TTask'
import { authTokenKey, getAuthToken } from '../auth/auth'

const URL = "https://ansaratracker.ru/newapi";
const headersWithContentType = { "Content-Type": "application/json" };

const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${Cookies.get(authTokenKey)}`,
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
  return fetch(`${URL}/authorize?username=${username}&password=${password}`, {
    method: "GET",
    headers: headersWithContentType,
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
  return fetch(`${URL}/Task?token=${getAuthToken()}`, {}).then(responseCheck);
}

// Добавление задачи
export function addTaskApi(task: TTaskCreate) {
  return fetch(`${URL}/createTask`, {
    method: "POST",
    body: JSON.stringify({
      token: getAuthToken(),
      ...task,
    }),
  }).then(responseCheck);
}
