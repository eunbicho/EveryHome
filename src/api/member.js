import { apiInstance } from "./index.js";
apiInstance;
const api = apiInstance();

async function registerUser(user, success, fail) {
  await api
    .post(`/user/register`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userId, success, fail) {
  await api.get(`/user/logout/${userId}`).then(success).catch(fail);
}

async function idCheck(userId, success, fail) {
  await api.get(`/user/${userId}`).then(success).catch(fail);
}

async function modifyUser(user, success, fail) {
  await api.put(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUser(userId, success, fail) {
  await api.delete(`/user/${userId}`).then(success).catch(fail);
}

export {
  registerUser,
  login,
  findById,
  tokenRegeneration,
  logout,
  idCheck,
  modifyUser,
  deleteUser,
};
