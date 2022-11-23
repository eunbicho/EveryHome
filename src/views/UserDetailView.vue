<template>
  <div>
    <the-header-navbar></the-header-navbar>
    <user-detail-comp></user-detail-comp>
  </div>
</template>

<script>
import UserDetailComp from "@/components/UserDetailComp.vue";
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";

export default {
  components: {
    UserDetailComp,
    TheHeaderNavbar,
  },
};
</script>

<style></style>
