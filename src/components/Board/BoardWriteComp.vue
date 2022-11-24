<template>
  <div class="frame">
    <v-container>
      <div
        style="
          display: flex;
          justify-content: flex-start;
          width: 800px;
          margin-bottom: 30px;
        "
      >
        <h2>글쓰기</h2>
      </div>
      <v-card style="width: 800px" height="600px">
        <div class="group">
          <v-text-field
            label="제목을 입력해주세요."
            outlined
            hide-details=""
            v-model="article.subject"
            style="padding: 10px"
          ></v-text-field>
        </div>
        <v-divider></v-divider>
        <div class="options">
          <b-form-select
            v-model="selectedType"
            :options="types"
            style="margin-left: 20px; width: 50%"
          ></b-form-select>
        </div>

        <v-textarea
          name="input-7-4"
          label="내용을 입력해주세요."
          class="contents"
          rows="12"
          outlined
          v-model="article.content"
        ></v-textarea>
        <div class="bottom">
          <v-card-actions>
            <v-btn outlined id="click" @click="write">작성완료</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { writeArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    write() {
      this.article.userId = this.userInfo.userId;
      this.article.type = this.selectedType;

      console.log(this.article.subject);

      // 제목, 말머리 선택, 내용이 비어있지 않을 때 등록되게 하기
      if (!this.article.subject) {
        alert("제목을 입력해주세요.");
      } else if (this.selectedType == null) {
        alert("말머리를 선택해주세요.");
      } else if (!this.article.content) {
        alert("내용을 입력해주세요.");
      } else {
        writeArticle(
          this.article,
          ({ data }) => {
            if (data === "success") {
              alert("등록이 완료되었습니다.");
              this.moveList();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
  data() {
    return {
      selectedType: null,
      types: [
        { value: null, text: "말머리를 선택해주세요" },
        { value: "룸메 구해요", text: "[룸메 구해요]" },
        { value: "질문글", text: "[질문글]" },
        { value: "배달 같이 시켜요", text: "[배달 같이 시켜요]" },
        { value: "방 양도해요", text: "[방 양도해요]" },
        { value: "정보공유", text: "[정보공유]" },
      ],
      article: {
        type: "",
        userId: "",
        subject: "",
        content: "",
        likes: 0,
        hits: 0,
        regTime: 0,
      },
    };
  },
};
</script>

<style scoped>
.frame {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.optionsRight {
  margin-right: 150px;
}

.contents {
  margin: 20px;
  height: 330px;
}

.theme--light.v-divider {
  border-color: rgb(157, 196, 157) !important;
  margin-top: 0;
}

.v-text-field--outlined >>> fieldset {
  border-color: rgb(157, 196, 157);
}

.bottom {
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  margin-top: 30px;
}
.custom-select {
  width: fit-content !important;
}
</style>
