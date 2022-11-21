<template>
  <div>
    <board-banner-comp></board-banner-comp>
    <prop-search-comp></prop-search-comp>
  </div>
</template>

<script>
import PropSearchComp from "@/components/Board/PropSearchComp.vue";
import BoardBannerComp from "@/components/Board/BoardBannerComp.vue";
export default {
  components: {
    PropSearchComp,
    BoardBannerComp,
  },
};
</script>

<style></style>
