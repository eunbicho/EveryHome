import { listArticle, listComment, writeComment } from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    articles: [],
    comments: [],
    curArticle: null,
    writeCommentFlag: false,
  },
  getters: {},
  mutations: {
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      state.curArticle = article;
    },
    SET_COMMENT_LIST(state, comments) {
      state.comments = comments;
    },
    SET_COMMENT_FLAG(state, flag) {
      state.flag = flag;
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
    getCommentList: ({ commit }, articleNo) => {
      listComment(
        articleNo,
        ({ data }) => {
          commit("SET_COMMENT_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    writeComment: ({ commit }, comment) => {
      writeComment(comment, ({ data }) => { 
        if (data == 'success') {
          commit("SET_COMMENT_FLAG", true);
        }
        else {
          commit("SET_COMMENT_FLAG", false);
        }
      }, (error) => { 
        console.log(error)
      })
    }
  },
};

export default boardStore;
