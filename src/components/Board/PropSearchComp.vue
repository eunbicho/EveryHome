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
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "말머리",
          align: "start",
          sortable: false,
          value: "name",
          width: "10%",
        },
        { text: "제목", value: "title", sortable: false, width: "40%" },
        { text: "글쓴이", value: "user", sortable: false, width: "10%" },
        { text: "작성시간", value: "time", width: "10%" },
        { text: "추천", value: "likes", width: "10%" },
      ],
      articles: [
        {
          name: "[룸메 구해요]",
          title: "롸롸롸롸",
          user: 6.0,
          time: 24,
          likes: 4.0,
        },
        {
          name: "[정보 공유]",
          title: 237,
          user: 9.0,
          time: 37,
          likes: 4.3,
        },
        {
          name: "[배달같이 시켜요]",
          title: 262,
          user: 16.0,
          time: 23,
          likes: 6.0,
        },
        {
          name: "[질문글]",
          title: 305,
          user: 3.7,
          time: 67,
          likes: 4.3,
        },
        {
          name: "[방 양도해요]",
          title: 356,
          user: 16.0,
          time: 49,
          likes: 3.9,
        },
        {
          name: "[질문글]",
          title: 375,
          user: 0.0,
          time: 94,
          likes: 0.0,
        },
        {
          name: "[방 양도해요]",
          title: 356,
          user: 16.0,
          time: 49,
          likes: 3.9,
        },
        {
          name: "[배달같이 시켜요]",
          title: 262,
          user: 16.0,
          time: 23,
          likes: 6.0,
        },
        {
          name: "[정보 공유]",
          title: 237,
          user: 9.0,
          time: 37,
          likes: 4.3,
        },
        {
          name: "[정보 공유]",
          title: 237,
          user: 9.0,
          time: 37,
          likes: 4.3,
        },
      ],
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

h2 {
}

h4 {
  color: gray;
}
</style>
