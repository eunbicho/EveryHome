import { apiInstance } from "./index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/house/sido`).then(success).catch(fail);
}

function gugunList(param, success, fail) {
  api.get(`/house/gugun`, { params: param }).then(success).catch(fail);
}

function dongList(param, success, fail) {
  api.get(`/house/dong`, { params: param }).then(success).catch(fail);
}

function listHouseDeal(param, success, fail) {
  api.get(`/house`, { params: param }).then(success).catch(fail);
}

export { sidoList, gugunList, dongList, listHouseDeal };