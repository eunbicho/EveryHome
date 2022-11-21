import { apiInstance } from "./index.js";

const api = apiInstance();

function writeArticle(article, success, fail) {
  api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

function selectArticle(articleNo, success, fail) {
  api.get(`/board/${articleNo}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleNo, success, fail) {
  api.delete(`/board/${articleNo}`).then(success).catch(fail);
}

function likeArticle(user, articleNo, success, fail) {
  api
    .put(`/board/like/${articleNo}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function unlikeArticle(user, articleNo, success, fail) {
  api
    .put(`/board/unlike/${articleNo}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function writeComment(comment, success, fail) {
  api.post(`/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

function listComment(articleNo, param, success, fail) {
  api.get(`/comment/${articleNo}`, { params: param }).then(success).catch(fail);
}

function modifyComment(comment, success, fail) {
  api.put(`/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

function deleteComment(commentNo, success, fail) {
  api.delete(`/comment/${commentNo}`).then(success).catch(fail);
}

function likeComment(user, commentNo, success, fail) {
  api
    .put(`/comment/like/${commentNo}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function unlikeComment(user, commentNo, success, fail) {
  api
    .put(`/comment/unlike/${commentNo}`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

export {
  listArticle,
  writeArticle,
  selectArticle,
  modifyArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  writeComment,
  listComment,
  modifyComment,
  deleteComment,
  likeComment,
  unlikeComment,
};
