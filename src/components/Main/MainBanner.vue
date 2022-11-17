<template>
  <div>
    <img class="mainImg" src="@/assets/main3.jpg" />
    <the-header-navbar class="navBar"></the-header-navbar>
    <div class="mainTitle">대학생 자취방 커뮤니티</div>
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
.mainImg {
  position: relative;
}

.navBar {
  position: absolute;
  top: 170px;
  left: 35px;
}

.mainTitle {
  position: absolute;
  top: 330px;
  left: 35px;
  font-weight: bold;
  font-size: 3rem;
  color: beige;
}
</style>
