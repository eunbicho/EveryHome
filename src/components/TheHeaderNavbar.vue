<template>
  <!-- <div>
    <router-link to="/" class="left">로고</router-link>
    <div class="right">
      <nav class="navBar beforeLogin" v-if="userInfo == null">
        <router-link to="/login">로그인 / 회원가입</router-link>
      </nav>
      <nav
        class="navBar afterLogin"
        v-if="userInfo != null"
        style="margin-right: 20px"
      >
        {{ userInfo.userName }}님 안녕하세요!
      </nav>
      <nav
        class="navBar afterLogin"
        @click.prevent="onClickLogout"
        v-if="userInfo != null"
      >
        로그아웃
      </nav>
      <nav class="navBar afterLogin" v-if="userInfo != null">
        <router-link to="/mypage">내 정보</router-link>
      </nav>
      <nav class="navBar">
        <router-link to="/board" v-if="userInfo != null">게시판</router-link>
      </nav>
    </div>
  </div> -->
  <div>
    <b-navbar id="header-nav-bar" toggleable="xl" type="dark" variant="success">
      <b-navbar-brand href="#" @click="toHome" style="font-size: 23px">
        <img
          src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top"
          alt="Kitten"
          style="margin-right: 5px"
        />
        EveryHome
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div @mouseover="onOver" @mouseleave="onLeave">
            <b-nav-item-dropdown ref="dropdown" right v-if="userInfo != null">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <span style="font-weight: bold; font-size: 16px; color: white"
                  >{{ userInfo.userName }} 님</span
                >
              </template>
              <b-dropdown-item href="#" @click="toFavorite"
                >관심지역</b-dropdown-item
              >
              <b-dropdown-item href="#" @click="toDetail"
                >회원정보 수정</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </div>
          <b-nav-item href="#" v-if="userInfo != null" @click="onClickLogout"
            >로그아웃</b-nav-item
          >
          <b-nav-item href="#" v-if="userInfo == null" @click="onClickLogin"
            >로그인 / 회원가입</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    onClickLogin() {
      this.$router.push({ path: "/login" });
    },
    onOver() {
      this.$refs.dropdown.visible = true;
    },
    onLeave() {
      this.$refs.dropdown.visible = false;
    },
    toDetail() {
      this.$router.push({ path: "/detail" });
    },
    toFavorite() {
      this.$router.push({ path: "/favorite" });
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

.bg-success {
  background-color: rgb(59, 175, 117) !important;
}

.background {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 20px;

  background-color: white;
  width: 1500px;
  height: 50px;
  border-radius: 5px;
}

.nav-link {
  font-weight: bold;
  font-size: 16px;
  color: white;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
}

.left {
  margin-left: 30px;
}

.right {
  display: flex;
  flex-direction: row;
}
</style>
