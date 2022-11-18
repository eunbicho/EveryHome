<template>
  <div>
    <main-banner-comp></main-banner-comp>
    <main-search-comp></main-search-comp>
    <main-result-comp></main-result-comp>
    <main-info-comp></main-info-comp>
  </div>
</template>

<script>
import MainBannerComp from "@/components/Main/MainBannerComp.vue";
import MainSearchComp from "@/components/Main/MainSearchComp.vue";
import MainResultComp from "@/components/Main/MainResultComp.vue";
import MainInfoComp from "@/components/Main/MainInfoComp.vue"

export default {
  components: {
    MainBannerComp,
    MainResultComp,
    MainSearchComp,
    MainInfoComp,

  },
};
</script>
MainBanner

<style></style>
