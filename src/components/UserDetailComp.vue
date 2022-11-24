<template>
  <div>
    <div class="detail">
      <img id="login-bg-img" src="@/assets/loginImg.jpg" alt="user login" />
      <div class="detail__content">
        <div class="detail__forms">
          <form action="" class="detail__register" id="detail-in">
            <h1 class="detail__title">{{ mode }}</h1>
            <div class="detail__box">
              <i class="bx bx-user detail__icon"></i>
              <input
                type="text"
                placeholder="아이디"
                class="detail__input"
                v-model="user.userId"
                readonly
                id="id"
              />
            </div>
            <b-tooltip target="id" triggers="hover"> 아이디 </b-tooltip>
            <div class="detail__box">
              <i class="bx bx-user detail__icon"></i>
              <input
                type="text"
                placeholder="이름"
                class="detail__input"
                v-model="user.userName"
                readonly
                id="name"
              />
            </div>
            <b-tooltip target="name" triggers="hover"> 이름 </b-tooltip>
            <div class="detail__box">
              <i class="bx bx-user detail__icon"></i>
              <input
                type="text"
                placeholder="이메일"
                class="detail__input"
                v-model="user.userEmail"
                readonly
                id="email"
              />
            </div>
            <b-tooltip target="email" triggers="hover"> 이메일 </b-tooltip>
            <div class="detail__box" v-show="changePwdMode || deleteUserMode">
              <i class="bx bx-lock detail__icon"></i>
              <input
                type="password"
                placeholder="현재 비밀번호"
                class="detail__input"
                v-model="curPwd"
              />
            </div>
            <div class="detail__box" v-show="changePwdMode">
              <i class="bx bx-lock detail__icon"></i>
              <input
                type="password"
                placeholder="변경할 비밀번호"
                class="detail__input"
                v-model="user.userPwd"
              />
            </div>
            <div class="detail__box" v-show="changePwdMode">
              <i class="bx bx-lock detail__icon"></i>
              <input
                type="password"
                placeholder="변경할 비밀번호 확인"
                class="detail__input"
                v-model="pwdConfirm"
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
              class="detail__button"
              style="margin-top: 20px; text-decoration: none; color: white"
              @click="modify"
              >비밀번호 수정</a
            >
            <a
              class="detail__button_delete"
              style="text-decoration: none; color: white"
              @click="deleteUser"
              >회원탈퇴</a
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { checkIdPwd, modifyUser, deleteUser } from "@/api/member";

const memberStore = "memberStore";

export default {
  created() {
    if (!this.userInfo) {
      alert("에러 발생! 홈 화면으로 이동합니다.");
      this.$router.push({ path: "/" });
    } else {
      this.user.userId = this.userInfo.userId;
      this.user.userName = this.userInfo.userName;
      this.user.userEmail = this.userInfo.userEmail;
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  data() {
    return {
      user: {
        userId: null,
        userName: null,
        userEmail: null,
        userPwd: null,
      },
      curPwd: null,
      pwdConfirm: null,
      dismissSecs: 10,
      dismissCountDown: 0,
      msg: null,
      changePwdMode: false,
      deleteUserMode: false,
      mode: "회원정보",
    };
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    modify() {
      if (this.deleteUserMode) {
        this.deleteUserMode = false;
      }

      if (!this.changePwdMode) {
        this.changePwdMode = true;
        this.mode = "비밀번호 수정";
        return;
      }

      if (!this.curPwd) {
        this.msg = "현재 비밀번호를 입력해주세요.";
        this.showAlert();
      } else if (!this.user.userPwd) {
        this.msg = "변경할 비밀번호를 입력해주세요.";
        this.showAlert();
      } else if (this.user.userPwd != this.pwdConfirm) {
        this.msg = "변경할 비밀번호가 일치하지 않습니다.";
        this.showAlert();
      } else {
        console.log("test ", this.userInfo)
        checkIdPwd(
          this.user.userId,
          this.curPwd,
          ({ data }) => {
            if (data == 0) {
              this.msg = "현재 비밀번호가 일치하지 않습니다.";
              this.showAlert();
            } else {
              console.log(this.user);
              modifyUser(
                this.user,
                ({ data }) => {
                  if (data == "success") {
                    alert("비밀번호가 변경되었습니다.");
                    this.$router.push({ path: "/" });
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    deleteUser() {
      if (this.changePwdMode) {
        this.changePwdMode = false;
      }

      if (!this.deleteUserMode) {
        this.deleteUserMode = true;
        this.mode = "회원탈퇴";
        return;
      }

      if (!this.curPwd) {
        this.msg = "비밀번호를 입력해주세요.";
        this.showAlert();
      } else {
        checkIdPwd(
          this.user.userId,
          this.curPwd,
          ({ data }) => {
            if (data == 0) {
              this.msg = "비밀번호가 일치하지 않습니다.";
              this.showAlert();
            } else {
              this.openDeleteModal();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    openDeleteModal() {
      this.$bvModal
        .msgBoxConfirm(
          "회원탈퇴 시 작성한 게시물, 댓글 등 모든 정보가 삭제됩니다.",
          {
            title: "회원탈퇴",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "회원탈퇴",
            cancelTitle: "닫기",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.userLogout(this.user.userId);
            deleteUser(
              this.user.userId,
              ({ data }) => {
                if (data == "success") {
                  alert("회원탈퇴 성공!");
                  this.$router.push({ path: "/" });
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

#detail-bg-img {
  z-index: 0 !important;
  position: absolute;
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

.detail {
  display: grid;
  grid-template-columns: 100%;
  height: 100vh;
  margin: 0 !important;

  position: relative !important;
  align-items: flex-start;
  justify-items: center;

  &__content {
    display: grid;
    z-index: 2 !important;
    position: absolute;
    margin: 0 !important;
    margin-top: 50px !important;
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
    position: static !important;
    bottom: 1rem;
    width: 100%;
    background-color: $color-lighten;
    padding: 1rem 1rem;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
    animation-duration: 0.4s;
    animation-name: animatedetail;
  }
  &__title {
    font-size: $big-font-size;
    margin-bottom: 1rem;
  }
  &__box {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 0.5rem;
    padding: 1.125rem 1rem;
    background-color: #fff;
    margin-top: 0.7rem;
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
    height: 50px;
    display: block;
    padding: 1rem;
    margin: 0.7rem 0;
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
  &__button_delete {
    height: 50px;
    display: block;
    padding: 1rem;
    margin: 0.7rem 0;
    background-color: #fb5757;
    color: #fff;
    font-weight: 600;
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s;

    &:hover {
      background-color: rgb(253, 60, 60);
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
@keyframes animatedetail {
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
  .detail {
    &__forms {
      width: 348px;
      justify-self: center;
    }
  }
}
@media screen and (min-width: 1024px) {
  .detail {
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
