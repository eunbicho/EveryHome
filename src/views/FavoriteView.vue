<template>
  <div>
    <main-banner-comp></main-banner-comp>
    <favorite-comp></favorite-comp>
  </div>
</template>

<script>
import MainBannerComp from "@/components/Main/MainBannerComp.vue";
import FavoriteComp from "@/components/FavoriteComp.vue";

export default {
  components: {
    MainBannerComp,
    FavoriteComp,
  },
};
</script>

<style></style>
