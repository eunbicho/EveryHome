<template>
  <div>
    <the-header-navbar></the-header-navbar>
    <login-register-comp></login-register-comp>
    <main-footer-comp></main-footer-comp>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
import LoginRegisterComp from "@/components/LoginRegister/LoginRegisterComp.vue";
import MainFooterComp from "@/components/Main/MainFooterComp.vue";

export default {
  components: {
    TheHeaderNavbar,
    LoginRegisterComp,
    MainFooterComp,
  },
};
</script>

<style scoped>
.comp-footer {
  margin-top: 0px !important;
}
</style>
