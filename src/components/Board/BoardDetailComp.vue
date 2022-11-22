<template>
  <div class="frame">
    <v-container>
      <v-card style="width: 800px" height="fit-content">
        <div class="group">
          <v-card-title>[제목]</v-card-title
          ><v-card-title style="width: fit-content">{{
            this.article.subject
          }}</v-card-title>
        </div>
        <v-divider></v-divider>
        <div class="options">
          <div class="optionsLeft">
            <div class="group">
              <v-card outlined class="key">말머리</v-card
              ><v-card-subtitle>[{{ this.article.type }}]</v-card-subtitle>
            </div>
            <div class="group">
              <v-card outlined class="key">작성자</v-card
              ><v-card-subtitle>{{ this.article.userId }}</v-card-subtitle>
            </div>
            <div class="group">
              <v-card outlined class="key">작성시간</v-card
              ><v-card-subtitle>{{ this.article.regTime }}</v-card-subtitle>
            </div>
          </div>
          <div class="optionsRight">
            <div class="group">
              <v-card outlined class="key">조회수</v-card
              ><v-card-subtitle>{{ this.article.hits }}</v-card-subtitle>
            </div>
            <div class="group">
              <v-card outlined class="key">추천수</v-card
              ><v-card-subtitle>{{ this.article.likes }}</v-card-subtitle>
            </div>
          </div>
        </div>

        <v-card outlined class="key contents" height="fit-content">
          <v-card-text class="text-left">
            <div v-html="article.content"></div>
          </v-card-text>
        </v-card>

        <div class="buttons">
          <div>
            <v-btn outlined color="pink">
              <v-icon dark> mdi-heart </v-icon></v-btn
            >
          </div>
          <div>
            <v-btn outlined @click="modifyArticle"> 수정</v-btn
            ><v-btn outlined @click="deleteArticle" style="margin-left: 10px"
              >삭제</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { selectArticle, deleteArticle } from "@/api/board";
export default {
  methods: {
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
    moveList() {
      this.$router.push({ name: "boardlist" });
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
    };
  },
  created() {
    // 선택한 게시물 가져오기
    this.articleNo = this.$route.params.articleNo;
    console.log(this.articleNo);
    selectArticle(
      this.articleNo,
      ({ data }) => {
        this.article = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.group {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
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
</style>
