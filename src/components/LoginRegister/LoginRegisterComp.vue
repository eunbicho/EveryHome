<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />

    <div class="login">
      <div class="login__content">
        <div class="login__img">
          <div class="container">
            <img src="@/assets/loginImg.jpg" alt="user login" />
          </div>
        </div>
        <div class="login__forms">
          <!-- login form -->
          <form action="" class="login__register" id="login-in">
            <h1 class="login__title">로그인</h1>
            <div class="login__box">
              <i class="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="아이디"
                class="login__input"
                v-model="user.userId"
              />
            </div>
            <div class="login__box">
              <i class="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호"
                class="login__input"
                v-model="user.userPwd"
              />
            </div>

            <b-alert
              :show="dismissCountDown"
              fade
              variant="danger"
              @dismiss-count-down="countDownChanged"
              class="alert-favorite"
            >
              {{ msg }}
            </b-alert>

            <a
              class="login__button"
              style="text-decoration: none; color: white"
              @click="confirm"
              >로그인</a
            >

            <div>
              <span class="login__account login__account--account"
                >계정이 없으신가요?</span
              ><br />
              <span class="login__signin login__signin--signup" id="sign-up"
                >회원가입</span
              >
            </div>
          </form>

          <!-- create account form -->
          <form action="" class="login__create none" id="login-up">
            <h1 class="login__title">회원가입</h1>

            <div class="login__box">
              <i class="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="아이디"
                class="login__input"
                v-model="rUser.userId"
                @keyup="check"
              />
            </div>
            <div id="idcheck-result" style="margin-top: 5px"></div>

            <div class="login__box">
              <i class="bx bx-smile login__icon"></i>
              <input
                type="text"
                placeholder="이름"
                class="login__input"
                v-model="rUser.userName"
              />
            </div>

            <div class="login__box">
              <i class="bx bx-at login__icon"></i>
              <input
                type="text"
                placeholder="이메일"
                class="login__input"
                v-model="rUser.userEmail"
              />
            </div>

            <div class="login__box">
              <i class="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호"
                class="login__input"
                v-model="rUser.userPwd"
              />
            </div>

            <div class="login__box">
              <i class="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호 확인"
                class="login__input"
                v-model="rUser.pwdConfirm"
              />
            </div>

            <b-alert
              :show="dismissCountDown2"
              fade
              variant="danger"
              @dismiss-count-down="countDownChanged2"
              class="alert-favorite"
            >
              {{ msg }}
            </b-alert>

            <a
              class="login__button"
              style="text-decoration: none; color: white"
              @click="register"
              >회원가입</a
            >

            <div>
              <span class="login__account login__account--account"
                >계정이 이미 있으신가요?<br
              /></span>
              <span class="login__signup login__signup--signup" id="sign-in"
                >로그인</span
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { idCheck, registerUser } from "@/api/member";

const memberStore = "memberStore";

export default {
  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
      rUser: {
        userId: null,
        userName: null,
        userEmail: null,
        userPwd: null,
        pwdConfirm: null,
      },
      idFlag: false,
      dismissSecs: 10,
      dismissCountDown: 0,
      dismissSecs2: 10,
      dismissCountDown2: 0,
      msg: null,
    };
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    countDownChanged2(dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2;
    },
    showAlert2() {
      this.dismissCountDown2 = this.dismissSecs2;
    },
    async confirm() {
      if (!this.user.userId) {
        this.msg = "아이디를 입력해주세요.";
        this.showAlert();
      } else if (!this.user.userPwd) {
        this.msg = "비밀번호를 입력해주세요";
        this.showAlert();
      } else {
        await this.userConfirm(this.user);
        let token = sessionStorage.getItem("access-token");
        // console.log("1. confirm() token >> " + token);
        if (this.isLogin) {
          await this.getUserInfo(token);
          console.log("4. confirm() userInfo :: ", this.userInfo);
          this.$router.push({ name: "main" });
        }
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
    async check() {
      let resultDiv = document.querySelector("#idcheck-result");

      if (this.rUser.userId.length >= 5 && this.rUser.userId.length <= 16) {
        await idCheck(
          this.rUser.userId,
          ({ data }) => {
            if (data == 0) {
              resultDiv.setAttribute("class", "mb-3 text-primary");
              resultDiv.textContent =
                this.rUser.userId + "는 사용할 수 있습니다.";
              this.idFlag = true;
            } else {
              resultDiv.setAttribute("class", "mb-3 text-danger");
              resultDiv.textContent =
                this.rUser.userId + "는 사용할 수 없습니다.";
              this.idFlag = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        resultDiv.setAttribute("class", "mb-3 text-dark");
        resultDiv.textContent = "아이디는 5자 이상 16자 이하 입니다.";
        this.idFlag = false;
      }
    },
    async register() {
      if (!this.idFlag) {
        this.msg = "아이디를 확인해주세요.";
        this.showAlert2();
      } else if (!this.rUser.userName) {
        this.msg = "이름을 입력해주세요.";
        this.showAlert2();
      } else if (!this.rUser.userEmail) {
        this.msg = "이메일을 입력해주세요.";
        this.showAlert2();
      } else if (!this.rUser.userPwd) {
        this.msg = "비밀번호를 입력해주세요.";
        this.showAlert2();
      } else if (this.rUser.userPwd != this.rUser.pwdConfirm) {
        this.msg = "비밀번호가 일치하지 않습니다.";
        this.showAlert2();
      } else {
        const loginin = document.getElementById("login-in");
        const loginup = document.getElementById("login-up");
        await registerUser(
          this.rUser,
          ({ data }) => {
            console.log("register " + data);
            alert(this.rUser.userName + "님 환영합니다!");
            loginin.classList.remove("none");
            loginup.classList.remove("block");

            loginin.classList.add("block");
            loginup.classList.add("none");

            this.clearRegister();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    clearRegister() {
      this.rUser.userId = null;
      this.rUser.userName = null;
      this.rUser.userEmail = null;
      this.rUser.userPwd = null;
      this.rUser.pwdConfirm = null;

      let resultDiv = document.querySelector("#idcheck-result");
      resultDiv.textContent = "";
    },
  },

  mounted() {
    const signup = document.getElementById("sign-up");
    const signin = document.getElementById("sign-in");
    const loginin = document.getElementById("login-in");
    const loginup = document.getElementById("login-up");

    signup.addEventListener("click", () => {
      loginin.classList.remove("block");
      loginup.classList.remove("none");

      loginin.classList.add("none");
      loginup.classList.add("block");
    });

    signin.addEventListener("click", () => {
      loginin.classList.remove("none");
      loginup.classList.remove("block");

      loginin.classList.add("block");
      loginup.classList.add("none");
    });
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

$color: #4ad395;
$color-dark: #23004d;
$color-light: #a49eac;
$color-lighten: #f2f2f2;
$color-hover: #65bf97;
$font: "Open Sans", sans-serif;
$big-font-size: 1.5rem;
$normal-font-size: 0.938rem;
$small-font-size: 0.813rem;

@media screen and (min-width: 768px) {
  $normal-font-size: 1rem;
  $small-font-size: 0.875rem;
}
*,
::before,
::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: $font;
  font-size: $normal-font-size;
  color: $color-dark;
}
h1 {
  margin: 0;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.login {
  display: grid;
  grid-template-columns: 100%;
  height: 100vh;
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  &__content {
    display: grid;
  }
  &__img {
    justify-self: center;

    img {
      width: 310px;
      margin-top: 1.5rem;
    }
  }
  &__forms {
    position: relative;
    height: 368px;
  }
  &__register,
  &__create {
    position: absolute;
    bottom: 1rem;
    width: 100%;
    background-color: $color-lighten;
    padding: 2rem 1rem;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
    animation-duration: 0.4s;
    animation-name: animateLogin;
  }
  &__title {
    font-size: $big-font-size;
    margin-bottom: 2rem;
  }
  &__box {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 0.5rem;
    padding: 1.125rem 1rem;
    background-color: #fff;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
  &__icon {
    font-size: 1.5rem;
    color: $color;
  }
  &__input {
    border: none;
    outline: none;
    font-size: $normal-font-size;
    font-weight: 700;
    color: $color-dark;
    width: 100%;

    &::placeholder {
      font-size: $normal-font-size;
      font-family: $font;
      color: $color-light;
    }
  }
  &__forgot {
    display: block;
    width: max-content;
    margin-left: auto;
    margin-top: 0.5rem;
    font-size: $small-font-size;
    font-weight: 600;
    color: $color-light;
  }
  &__button {
    display: block;
    padding: 1rem;
    margin: 1rem 0;
    background-color: $color;
    color: #fff;
    font-weight: 600;
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s;

    &:hover {
      background-color: $color-hover;
    }
  }
  &__account,
  &__signin,
  &__signup {
    font-weight: 600;
    font-size: $small-font-size;

    &--account {
      color: $color-dark;
    }
    &--signin,
    &--signup {
      color: $color;
      cursor: pointer;
    }
  }
  &__social {
    margin-top: 2rem;

    &--icon {
      font-size: 1.5rem;
      color: $color-dark;
      margin: 0 1rem;
    }
  }
}
.block {
  display: block;
}
.none {
  display: none;
}
@keyframes animateLogin {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@media screen and (min-width: 576px) {
  .login {
    &__forms {
      width: 348px;
      justify-self: center;
    }
  }
}
@media screen and (min-width: 1024px) {
  .login {
    height: 100vh;
    overflow: hidden;
    &__content {
      grid-template-columns: repeat(2, max-content);
      justify-content: center;
      align-items: center;
      margin-left: 10rem;
    }
    &__img {
      display: flex;
      width: 600px;
      height: 588px;
      background-color: #fff;
      border-radius: 1rem;
      padding-left: 1rem;

      img {
        width: 80%;
        margin-top: 0;
      }
    }
    &__register,
    &__create {
      left: -11rem;
    }
    &__register {
      bottom: -2rem;
    }
    &__create {
      bottom: -5.5rem;
    }
  }
}

.alert-favorite {
  margin-top: 0.7rem;
}
</style>
