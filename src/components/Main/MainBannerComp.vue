<template>
  <div class="frame">
    <img class="mainImg" src="@/assets/main3.jpg">
    <the-header-navbar class="navBar"></the-header-navbar>
    <div class="mainTitle">
      <h3>대학생 자취방 커뮤니티</h3>
      <div class="btnBack">
        <button class="custom-btn btn-6"><span>게시판 바로가기</span></button>
      </div>
    </div>
    
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
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
 
  
}

.mainTitle {
  position: absolute;
  top: 280px;
  left: 35px;
  font-size: 3rem;
  color: beige;
  display: flex;
  flex-direction: column;
  margin: 0;
}




/* button */

button {
  margin: 20px;
  outline: none;
}
.custom-btn {
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

/* 6 */
.btn-6 {
   background: #000;
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-6 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-6:before,
.btn-6:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 2px;
  background: #000;
}
.btn-6:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
.btn-6:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
.btn-6:hover{
  color: #000;
  background: transparent;
}
.btn-6:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
.btn-6 span:before,
.btn-6 span:after {
  position: absolute;
  content: "";
  background: #000;
}
.btn-6 span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: 2px;
  transition: all 500ms ease;
}
.btn-6 span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  transition: all 500ms ease;
}
.btn-6 span:hover:before {
  width: 100%;
}
.btn-6 span:hover:after {
  width: 100%;
}

</style>
