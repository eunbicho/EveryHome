<template>
  <div>
    <main-banner-comp></main-banner-comp>
    <favorite-comp></favorite-comp>
    <main-footer-comp></main-footer-comp>
  </div>
</template>

<script>
import MainBannerComp from "@/components/Main/MainBannerComp.vue";
import FavoriteComp from "@/components/FavoriteComp.vue";
import MainFooterComp from "@/components/Main/MainFooterComp.vue";

export default {
  components: {
    MainBannerComp,
    FavoriteComp,
    MainFooterComp,
  },
};
</script>

<style></style>
