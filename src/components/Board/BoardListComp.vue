<template>
  <v-card class="frame">
    <v-card-title class="head">
      <div class="left">
        <h2>커뮤니티</h2>
        <h4>우리들의 공간</h4>
      </div>

      <v-spacer></v-spacer>

      <div class="right">
        <!-- 말머리 선택 -->

        <v-select
          :items="items"
          label="말머리 선택"
          dense
          solo
          v-model="searchCondition.type"
        ></v-select>

        <!-- 글쓴이, 제목 선택 -->

        <v-select
          :items="itemsSearch"
          label="검색 조건"
          dense
          solo
          v-model="searchCondition.key"
        ></v-select>

        <!-- 글 검색하기 -->
        <v-text-field
          class="shrink"
          append-icon="mdi-magnify"
          label="검색어"
          single-line
          v-model="searchCondition.word"
        ></v-text-field>
        <v-btn @click="search" style="margin-left: 10px">검색</v-btn>
      </div>
    </v-card-title>

    <div class="articleFrame">
      <v-data-table
        class="articles"
        :headers="headers"
        :items="articles"
        :search="search"
        @click:row="test"
      ></v-data-table>
    </div>
  </v-card>
</template>

<script>
import { listArticle } from "@/api/board";

export default {
  methods: {
    search() {
      if (this.searchCondition.key == "제목") {
        this.searchCondition.key = "subject";
      } else if (this.searchCondition.key == "글쓴이") {
        this.searchCondition.key = "userId";
      }
      listArticle(
        this.searchCondition,
        ({ data }) => {
          this.articles = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    test(event, { item }) {
      console.log(item);
    },
  },
  created() {
    listArticle(
      {},
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
      items: [
        "룸메 구해요",
        "정보 공유",
        "배달 같이 시켜요",
        "질문글",
        "방 양도해요",
      ],
      itemsSearch: ["글쓴이", "제목"],
      searchCondition: {
        key: "",
        word: "",
        type: "",
      },
    };
  },
};
</script>

<style scoped>
.frame {
  display: flex;
  flex-direction: column;
}

.head {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 270px;
  margin-right: 270px;
}

.articles {
  width: 70%;
  height: 50%;
}

.searchBar {
  width: 100px;
}

.articleFrame {
  display: flex;
  justify-content: center;
}

v-container {
  width: 100%;
}

row align-center {
  width: 100px;
}

.left {
  display: flex;
  flex-direction: column;
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 500px;
}

h4 {
  color: gray;
}

.v-text-field__details {
  display: none;
}

.v-messages theme--light {
  display: none;
}
</style>
