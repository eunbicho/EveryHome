import {
  listArticle,
} from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    articles: [],
    comments: [],
    curArticle: null,
  },
  getters: {},
  mutations: {
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      state.curArticle = article;
    }
  },
  actions: {
    getArticleList: ({ commit }, searchCondition) => {
      listArticle(
        searchCondition,
        ({ data }) => {
          console.log(data);
          commit("SET_ARTICLE_LIST", data);
        },
        (error) => {
          console.log(error);
          alert("게시물 목록 로딩 중 오류 발생!");
        }
      );
    },
  },
};

export default boardStore;
