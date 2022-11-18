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
                v-model="userId"
              />
            </div>
            <div class="login__box">
              <i class="bx bx-lock login__icon"></i>
              <input
                type="password"
                placeholder="비밀번호"
                class="login__input"
                v-model="userPwd"
              />
            </div>
            <a href="#" class="login__forgot">비밀번호를 잊으셨나요? </a>

            <a href="#" class="login__button" @click="login">로그인</a>

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
              <input type="text" placeholder="아이디" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-smile login__icon"></i>
              <input type="text" placeholder="이름" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-at login__icon"></i>
              <input type="text" placeholder="이메일" class="login__input" />
            </div>

            <div class="login__box">
              <i class="bx bx-lock login__icon"></i>
              <input type="text" placeholder="비밀번호" class="login__input" />
            </div>

            <input type="submit" value="회원가입" class="login__button" />
            <a href="#" class="login__button">회원가입</a>

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

const memberStore = "memberStore";

export default {
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
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
    margin: 2rem 0;
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
</style>
