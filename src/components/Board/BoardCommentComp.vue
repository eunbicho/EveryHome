<template>
  <div class="frame">
    <v-container>
      <v-card
        style="
          width: 800px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        "
        height="fit-content"
      >
        <!-- 왼쪽 섹션 (아이콘) -->
        <div class="left">
          <v-icon large color="green"> mdi-message-text </v-icon>
        </div>

        <!-- 오른쪽 섹션 (작성자 이름, 작성날짜, 작성내용) -->
        <div class="right">
          <div class="head">
            <v-card-text class="commentId" v-show="!isModifyMode">{{
              comment.userId
            }}</v-card-text>
            <v-card-text class="commentDate" v-show="!isModifyMode">{{
              comment.regTime
            }}</v-card-text>
            <!--수정 삭제 버튼-->
            <div class="buttons" v-if="userInfo.userId == comment.userId">
              <div>
                <v-btn color="white" elevation="0" @click="modifyToggle">
                  {{ this.modifyMsg }}</v-btn
                ><v-btn
                  color="white"
                  elevation="0"
                  @click="deleteComment"
                  v-if="!isModifyMode"
                  >삭제</v-btn
                >
              </div>
            </div>
          </div>
          <!-- 수정모드 일 때 입력란-->
          <v-textarea
            hide-details=""
            outlined
            class="contents"
            height="fit-content"
            style="margin-top: 10px"
            rows="1"
            v-if="isModifyMode"
            v-model="newComment.content"
          ></v-textarea>
          <!-- 수정모드 아닐 때 댓글 내용-->
          <v-card
            outlined
            class="contents"
            height="fit-content"
            v-if="!isModifyMode"
          >
            <v-card-text>
              <div v-html="cContent">{{ comment.content }}</div>
            </v-card-text>
          </v-card>
        </div>
        <div style="margin-left: 10px; margin-right: 10px; margin-top: 30px">
          <!-- 추천 버튼-->
          <v-btn
            outlined
            :color="btnColor"
            @click="likeToggleComment"
            v-if="!isModifyMode"
          >
            <v-icon :color="iconColor"> mdi-heart </v-icon>
            <div style="margin-left: 2px">{{ this.commentLike }}</div></v-btn
          >
          <!-- 수정모드일 때 작성 버튼-->
          <div
            style="margin-left: 10px; margin-right: 10px"
            v-if="isModifyMode"
          >
            <v-btn outlined @click="modifyComment" color="green"> 수정</v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {
  deleteComment,
  checkCommentLike,
  likeComment,
  unlikeComment,
  modifyComment,
} from "@/api/board";
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  props: {
    comment: Object,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    cContent() {
      return this.comment.content.split("\n").join("<br />");
    },
  },
  data() {
    return {
      btnColor: "",
      iconColor: "",
      commentLike: this.comment.likes,
      isModifyMode: false,
      modifyMsg: "수정",
      newComment: {
        commentNo: "",
        userId: "",
        content: "",
      },
    };
  },
  created() {
    // 현재 사용자의 추천 유무 확인

    checkCommentLike(
      { userId: this.userInfo.userId, commentNo: this.comment.commentNo },
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
  },
  methods: {
    modifyToggle() {
      this.newComment.content = this.comment.content;
      console.log("수정해야해");
      // modify모드 토글
      if (this.isModifyMode) {
        this.isModifyMode = false;
        this.modifyMsg = "수정";
      } else {
        this.isModifyMode = true;
        this.modifyMsg = "수정취소";
      }
    },
    modifyComment() {
      this.newComment.userId = this.comment.userId;
      this.newComment.commentNo = this.comment.commentNo;
   
      modifyComment(
        this.newComment,
        ({ data }) => {
          if (data === "success") {
            alert("수정 성공!");
            this.$router.go();
          } else {
            console.log("수정 안됨..");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteComment() {
      deleteComment(
        this.comment.commentNo,
        ({ data }) => {
          if (data === "success") {
            alert("댓글 삭제 완료!");
            this.$router.go();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    likeToggleComment() {
      checkCommentLike(
        { userId: this.userInfo.userId, commentNo: this.comment.commentNo },
        ({ data }) => {
          if (data === 1) {
            // 누른 적 있으면 버튼 눌렀을 때 취소
            unlikeComment(
              this.userInfo,
              parseInt(this.comment.commentNo),
              ({ data }) => {
                if (data === "success") {
                  this.btnColor = "grey";
                  this.iconColor = "grey";
                  this.commentLike -= 1;
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            // 누른 적 없으면 버튼 눌렀을 때 추천

            likeComment(
              this.userInfo,
              parseInt(this.comment.commentNo),
              ({ data }) => {
                if (data === "success") {
                  this.btnColor = "pink";
                  this.iconColor = "pink";
                  this.commentLike += 1;
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
  },
};
</script>

<style scoped>
.left {
  margin: 20px;
}

.right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.head {
  display: flex;
  flex-direction: row;
  height: fit-content;
  justify-content: flex-start;
}

.v-card__text {
  width: fit-content;
  height: fit-content;
  padding: 10px;
}

.v-btn {
  width: fit-content;
  margin: 0 !important;
}

.commentId {
  font-size: 1.1rem;
}
.buttons {
  margin-left: auto;
}
</style>
