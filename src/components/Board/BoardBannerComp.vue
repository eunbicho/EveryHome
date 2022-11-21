<template>
  <div>
    <div class="header" />
    <the-header-navbar class="navBar"></the-header-navbar>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
export default {
  components: {
    TheHeaderNavbar,
  },
};
</script>

<style scoped>
.frame {
  position: relative;
}

.navBar {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header {
  background-color: rgb(157, 196, 157);
  width: 100%;
  height: 100px;
}
</style>
