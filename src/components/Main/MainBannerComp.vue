<template>
  <div class="frame">
    <img class="mainImg" src="@/assets/main3.jpg" />
    <the-header-navbar class="navBar"></the-header-navbar>
    <div class="mainTitle">
      <h3>대학생들을 위한</h3>
      <h3 style="color: beige; margin-top: -1px">자취방 커뮤니티</h3>
      <button class="custom-btn btn-6" @click="toBoard">
        <span>게시판 바로가기</span>
      </button>
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

.navBar {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mainTitle {
  position: absolute;
  top: 180px;
  left: 35px;
  font-size: 3rem;
  color: white;
  text-shadow: 1px 1px black;
  display: flex;
  flex-direction: column;
  margin: 0;
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
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid black;
  font-family: "Lato", sans-serif;

  font-weight: 500;
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
  background: white;
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
