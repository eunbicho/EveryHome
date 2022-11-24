<template>
  <div class="frame">
    <v-container>
      <v-card
        style="width: 800px; padding-top: 10px; margin-top: 15px"
        height="fit-content"
      >
        <div>
          <div class="group" style="float: left; margin-left: 10px">
            <v-card outlined class="key">{{ this.article.type }}</v-card>
            <v-card-title style="font-weight: bold">{{
              this.article.subject
            }}</v-card-title>
          </div>

          <div class="group" style="float: right">
            <v-card outlined class="key">추천수</v-card
            ><v-card-subtitle>{{ this.article.likes }}</v-card-subtitle>
          </div>
          <div class="group" style="float: right">
            <v-card outlined class="key">조회수</v-card
            ><v-card-subtitle>{{ this.article.hits }}</v-card-subtitle>
          </div>
        </div>

        <div style="clear: both">
          <div
            class="group"
            style="float: left; margin-bottom: 10px; margin-left: 10px"
          >
            <v-card outlined class="key">작성자</v-card
            ><v-card-subtitle>{{ this.article.userId }}</v-card-subtitle>
          </div>
          <div class="group" style="float: right">
            <v-card outlined class="key">작성시간</v-card
            ><v-card-subtitle>{{ this.article.regTime }}</v-card-subtitle>
          </div>
        </div>

        <v-divider style="clear: both"></v-divider>

        <v-card outlined class="key contents" height="fit-content">
          <v-card-text class="text-left" style="color: black">
            <div v-html="cContent"></div>
          </v-card-text>
        </v-card>

        <div class="buttons">
          <div>
            <v-btn outlined :color="btnColor" @click="likeToggleArticle">
              <v-icon :color="iconColor"> mdi-heart </v-icon></v-btn
            >
          </div>
          <div v-if="userInfo.userId == this.article.userId">
            <v-btn outlined @click="modifyArticle"> 수정</v-btn
            ><v-btn outlined @click="deleteArticle" style="margin-left: 10px"
              >삭제</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-container>

    <div
      style="
        width: 800px;
        display: flex;
        justify-content: flex-start;
        margin-left: 15px;
        margin-top: 15px;
      "
    >
      <h5>댓글 작성</h5>
    </div>
    <board-comment-write-comp
      :articleNo="article.articleNo"
    ></board-comment-write-comp>
    <div
      style="
        width: 800px;
        display: flex;
        justify-content: flex-start;
        margin-left: 15px;
        margin-top: 15px;
      "
      v-show="commentList.length != 0"
    >
      <h5>댓글 목록</h5>
    </div>
    <board-comment-comp
      v-for="comment in commentList"
      :key="comment.commentNo"
      :comment="comment"
      @commentWrite="loadComment"
    ></board-comment-comp>
  </div>
</template>

<script>
import {
  selectArticle,
  deleteArticle,
  likeArticle,
  checkArticleLike,
  unlikeArticle,
  listComment,
} from "@/api/board";
import { mapState, mapMutations } from "vuex";
import BoardCommentComp from "@/components/Board/BoardCommentComp.vue";
import BoardCommentWriteComp from "@/components/Board/BoardCommentWriteComp.vue";
const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  components: {
    BoardCommentComp,
    BoardCommentWriteComp,
  },
  methods: {
    ...mapMutations(["SET_ARTICLE"]),
    loadComment() {
      console.log("comment loaded");

      listComment(
        this.articleNo,
        ({ data }) => {
          // 댓글 목록 뿌려주기
          // console.log("listComment", data);
          this.commentList = data;
          // console.log("commentList", this.commentList);
          // this.comments = data;
        },
        (error) => {
          console.log("listComment", error);
        }
      );
    },
    deleteArticle() {
      deleteArticle(
        this.articleNo,
        ({ data }) => {
          if (data === "success") {
            alert("삭제가 완료되었습니다.");
            this.moveList();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyArticle() {
      this.$router.push({
        name: "boardmodify",
        params: { articleNo: this.articleNo },
      });
    },
    likeToggleArticle() {
      checkArticleLike(
        { userId: this.userInfo.userId, articleNo: this.articleNo },
        ({ data }) => {
          if (data === 1) {
            // 누른 적 있으면 버튼 눌렀을 때 취소
            unlikeArticle(
              this.userInfo,
              parseInt(this.articleNo),
              ({ data }) => {
                if (data === "success") {
                  this.btnColor = "grey";
                  this.iconColor = "grey";
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            // 누른 적 없으면 버튼 눌렀을 때 추천

            likeArticle(
              this.userInfo,
              parseInt(this.articleNo),
              ({ data }) => {
                if (data === "success") {
                  this.btnColor = "pink";
                  this.iconColor = "pink";
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(boardStore, ["curArticle"]),
    ...mapState(boardStore, ["comments"]),
    cContent() {
      return this.article.content.split("\n").join("<br />");
    },
  },
  data() {
    return {
      article: {
        articleNo: "",
        type: "",
        userId: "",
        subject: "",
        content: "",
        likes: "",
        hits: "",
        regTime: "",
      },
      btnColor: "",
      iconColor: "",
      commentList: [],
      comment: {
        commentNo: "",
        articleNo: "",
        userId: "",
        content: "",
        likes: "",
        regTime: "",
      },
    };
  },
  created() {
    // 선택한 게시물 가져오기
    this.articleNo = this.$route.params.articleNo;
    console.log("현재 게시글 번호", this.articleNo);

    console.log("변경한 curArticle 번호", this.curArticle);
    selectArticle(
      this.articleNo,
      ({ data }) => {
        this.article = data;
        this.SET_ARTICLE(this.article);
        console.log("현재 게시물 정보", this.article);
      },
      (error) => {
        console.log(error);
      }
    );

    // 현재 사용자의 추천 유무 확인
    checkArticleLike(
      { userId: this.userInfo.userId, articleNo: this.articleNo },
      ({ data }) => {
        if (data === 1) {
          console.log("누른적 있음", data);
          // 누른 적 있으면 시작할 때 버튼 색 있게
          this.btnColor = "pink";
          this.iconColor = "pink";
        } else {
          console.log("누른적 없음", data);
          // 누른 적 없으면 시작할 때 버튼 색 없게
          this.btnColor = "grey";
          this.iconColor = "grey";
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.loadComment();
  },
};
</script>

<style scoped>
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
}

.group {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}

.head {
  justify-content: space-between;
}

.key {
  padding: 5px;
  font-size: 14px;
}

.options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.optionsRight {
  margin-right: 150px;
  display: flex;
}

.contents {
  margin-left: 20px;
  margin-right: 20px;
}

.theme--light.v-divider {
  border-color: rgb(157, 196, 157) !important;
  margin-top: 0;
}

.buttons {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}

.v-card__title {
  padding: 7px;
  font-size: 1rem;
}

.v-card__subtitle {
  padding: 7px;
  padding-left: 10px;
  margin-right: 10px;
}
</style>
