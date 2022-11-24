<template>
  <div class="frame">
    <the-header-navbar></the-header-navbar>
    <img class="mainImg" src="@/assets/main3.jpg" />
    <div class="mainTitle">
      <h3>대학생들을 위한</h3>
      <h3 style="color: beige; margin-top: -1px">자취방 커뮤니티</h3>
      <button class="custom-btn btn-6" @click="toBoard">게시판 바로가기</button>
    </div>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  components: {
    TheHeaderNavbar,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    toBoard: function () {
      if (this.userInfo == null) {
        alert("로그인 후 이용할 수 있습니다.");
      } else {
        this.$router.push({ path: "/board" });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff");

.frame {
  position: relative;
}

.mainTitle {
  position: absolute;
  top: 280px;
  left: 60px;

  color: white;
  text-shadow: 1px 1px black;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.mainTitle h3 {
  font-size: 5rem;
}

h3 {
  margin: 0px;
  font-family: "KOTRA_BOLD-Bold";
}

a {
  text-decoration: none;
  color: white;
}

/* button */

button {
  outline: none;
  margin-top: 10px;
}
.custom-btn {
  font: initial;
  width: 250px;
  height: 60px;
  padding: 10px 25px;
  border: 2px solid black;
  font-size: 30px;
  border-radius: 10px !important;

  font-weight: bold;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

/* 6 */
.btn-6 {
  background: rgb(59, 175, 117);
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
  border-radius: 2px;
}
.btn-6 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-6:before,
.btn-6:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 2px;
  background: black;
}
.btn-6:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-6:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-6:hover {
  color: #000;
  background: rgb(164, 241, 145);
}
.btn-6:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6 span:before,
.btn-6 span:after {
  position: absolute;
  content: "";
  background: black;
}
.btn-6 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: 2px;
  transition: all 500ms ease;
}
.btn-6 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  transition: all 500ms ease;
}
.btn-6 span:hover:before {
  width: 100%;
}
.btn-6 span:hover:after {
  width: 100%;
}

.v-application code {
  all: unset;
  color: #eee;
}
</style>
