<template>
  <div>
    <board-banner-comp></board-banner-comp>
    <router-view></router-view>
    <main-footer-comp></main-footer-comp>
  </div>
</template>

<script>
import BoardBannerComp from "@/components/Board/BoardBannerComp.vue";
import MainFooterComp from "@/components/Main/MainFooterComp.vue";

export default {
  components: {
    BoardBannerComp,
    MainFooterComp,
  },
};
</script>

<style></style>
