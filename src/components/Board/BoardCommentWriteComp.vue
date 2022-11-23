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
          <v-textarea
            hide-details=""
            outlined
            class="contents"
            height="fit-content"
            style="margin-top: 10px"
            rows="1"
            v-model="comment.content"
          >
            <div>댓글이다!</div>
          </v-textarea>
        </div>

        <!--수정 삭제 버튼-->

        <div class="buttons">
          <div style="margin-left: 10px; margin-right: 10px">
            <v-btn outlined @click="writeComment" color="green"> 작성</v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { writeComment } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";
const boardStore = "boardStore";
export default {
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(boardStore, ["curArticle"]),
  },

  data() {
    return {
      comment: {
        articleNo: "",
        userId: "",
        content: "",
      },
    };
  },
  methods: {
    writeComment() {
      console.log("이 번호 게시물에 댓글을 남겼습니다.",this.curArticle.articleNo)
      this.comment.articleNo = this.curArticle.articleNo;
      this.comment.userId = this.userInfo.userId;
      console.log(this.userInfo.userId);
      writeComment(
        this.comment,
        ({ data }) => {
          if (data === "success") {
            if (confirm("댓글 작성완료!")) {
              this.$router.go();
            }
            // listComment(
            //   this.articleNo,
            //   ({ data }) => {
            //     // 댓글 목록 뿌려주기
            //     // console.log("listComment", data);
            //     this.commentList = data;
            //     // console.log("commentList", this.commentList);
            //     // this.comments = data;
            //   },
            //   (error) => {
            //     console.log("listComment", error);
            //   }
            // );

            this.moveDetail();
          }
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveDetail() {
      this.$router.push({ name: "boarddetail" });
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
}

.v-card__text {
  width: fit-content;
  height: fit-content;
  padding: 10px;
}

.v-btn {
  width: fit-content;
}

.commentId {
  font-size: 1.1rem;
}
</style>
