<template>
  <div class="background">
    <router-link to="/" class="left">로고</router-link>
    <div class="right">
      <nav class="navBar"><router-link to="/login">로그인</router-link></nav>
      <nav class="navBar"><router-link to="/board">게시판</router-link></nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navBar {
  background-color: rgba(255, 255, 255, 0);
  color: white;
}

.background {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 20px;

  background-color: white;
  width: 600px;
  height: 50px;
  border-radius: 5px;
}

.left{
  margin-left: 30px;
}

.right{
  display: flex;
  flex-direction: row;
}
</style>
