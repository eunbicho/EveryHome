import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import LoginRegisterView from "../views/LoginRegisterView";
import BoardView from "../views/BoardView";
import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginRegisterView,
  },
  {
    path: "/board",
    name: "board",
    beforeEnter: onlyAuthUser,
    component: BoardView,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/Board/BoardListComp"),
      },
      {
        path: "write",
        name: "boardwrite",

        component: () => import("@/components/Board/BoardWriteComp"),
      },
      {
        path: "detail/:articleNo",
        name: "boarddetail",

        component: () => import("@/components/Board/BoardDetailComp"),
      },

      {
        path: "modify/:articleNo",
        name: "boardmodify",
        
        component: () => import("@/components/Board/BoardModifyComp"),
      },

    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
