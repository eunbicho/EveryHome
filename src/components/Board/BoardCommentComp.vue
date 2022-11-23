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
            <v-card-text class="commentId">{{comment.userId}}</v-card-text>
            <v-card-text class="commentDate">{{comment.regTime}}</v-card-text>
            <!--수정 삭제 버튼-->
            <div class="buttons">
              <div>
                <v-btn color="white" elevation="0" @click="modifyComment">
                  수정</v-btn
                ><v-btn color="white" elevation="0" @click="deleteComment"
                  >삭제</v-btn
                >
              </div>
            </div>
          </div>
          <v-card outlined class="contents" height="fit-content">
            <v-card-text>
              <div>{{comment.content}}</div>
            </v-card-text>
          </v-card>
        </div>
        <div style="margin-left: 10px; margin-right: 10px; margin-top: 30px">
          <!-- 추천 버튼-->
          <v-btn outlined :color="btnColor" @click="likeToggleComment">
            <v-icon :color="iconColor"> mdi-heart </v-icon>
            <div style="margin-left: 2px">{{comment.likes}}</div></v-btn
          >
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  props:{
    comment: Object
  }
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
