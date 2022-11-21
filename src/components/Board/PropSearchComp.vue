<template>
  <v-card class="frame">
    <v-card-title>
      <div class="boardTitle">
        <h2>커뮤니티</h2>
        <h4>우리들의 공간</h4>
      </div>

      <v-spacer></v-spacer>
      <v-text-field
        class="searchBar"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div class="articleFrame">
      <v-data-table
        class="articles"
        :headers="headers"
        :items="articles"
        :search="search"
      ></v-data-table>
    </div>
  </v-card>
</template>

<script>
import { listArticle } from "@/api/board";

export default {
  created() {
    const searchCondition = {};
    listArticle(
      searchCondition,
      ({ data }) => {
        this.articles = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        alert("게시물 목록 로딩 중 오류 발생!");
      }
    );
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "말머리",
          align: "start",
          sortable: false,
          value: "type",
          width: "10%",
        },
        { text: "제목", value: "subject", sortable: false, width: "40%" },
        { text: "글쓴이", value: "userId", sortable: false, width: "10%" },
        { text: "작성시간", value: "regTime", width: "10%" },
        { text: "추천", value: "likes", width: "10%" },
        { text: "조회수", value: "hits", width: "10%" },
      ],
      articles: [],
    };
  },
};
</script>

<style scoped>
.frame {
  display: flex;
  flex-direction: column;
}

.articles {
  width: 70%;
  height: 50%;
}

.articleFrame {
  display: flex;
  justify-content: center;
}

.searchBar {
  margin-right: 100px;
}

.v-input__control {
  width: 10px !important;
}

.boardTitle {
  display: flex;
  flex-direction: column;
  margin-left: 270px;
  margin-top: 50px;
}

h4 {
  color: gray;
}
</style>
