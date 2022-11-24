<template>
  <div>
    <main-banner-comp></main-banner-comp>
    <main-search-comp></main-search-comp>
    <main-result-comp></main-result-comp>
    <main-info-comp></main-info-comp>
    <main-footer-comp></main-footer-comp>
  </div>
</template>

<script>
import MainBannerComp from "@/components/Main/MainBannerComp.vue";
import MainSearchComp from "@/components/Main/MainSearchComp.vue";
import MainResultComp from "@/components/Main/MainResultComp.vue";
import MainInfoComp from "@/components/Main/MainInfoComp.vue";
import MainFooterComp from "@/components/Main/MainFooterComp.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  components: {
    MainBannerComp,
    MainResultComp,
    MainSearchComp,
    MainInfoComp,
    MainFooterComp,
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  created() {
    console.log("userInfo: ", this.userInfo);
  },
};
</script>
MainBanner

<style></style>
