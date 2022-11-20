<template>
  <div class="background">
    <router-link to="/" class="left">로고</router-link>
    <div class="right">
      <nav class="navBar beforeLogin"><router-link to="/login">로그인</router-link></nav>
      <nav class="navBar afterLogin" @click.prevent="onClickLogout">로그아웃</nav>
      <nav class="navBar afterLogin"><router-link to="/mypage">내 정보</router-link></nav>
      <nav class="navBar"><router-link to="/board">게시판</router-link></nav>
    </div>
  </div>
</template>

<script>
import {mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
.navBar {
  background-color: rgba(255, 255, 255, 0);
  color: black;
  margin-left: 5px;
}

.background {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding-right: 20px;

  background-color: white;
  width: 600px;
  height: 50px;
  border-radius: 5px;
}

.left{
  margin-left: 30px;
}

.right{
  display: flex;
  flex-direction: row;
}
</style>
