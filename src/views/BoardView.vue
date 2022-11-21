<template>
  <div>
    <board-banner-comp></board-banner-comp>
    <router-view></router-view>
  </div>
</template>

<script>
import BoardBannerComp from "@/components/Board/BoardBannerComp.vue";
export default {
  components: {
    BoardBannerComp,
  },
};
</script>

<style></style>
