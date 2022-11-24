<template>
  <div>
    <the-header-navbar></the-header-navbar>
    <user-detail-comp></user-detail-comp>
    <main-footer-comp></main-footer-comp>
  </div>
</template>

<script>
import UserDetailComp from "@/components/UserDetailComp.vue";
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
import MainFooterComp from "@/components/Main/MainFooterComp.vue";

export default {
  components: {
    UserDetailComp,
    TheHeaderNavbar,
    MainFooterComp,
  },
};
</script>

<style scoped>
.comp-footer {
  margin-top: 0px !important;
}
</style>
