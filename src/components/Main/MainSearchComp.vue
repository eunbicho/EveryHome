<template>
  <div class="frame">
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />

    <h2>원하는 방을 찾아보세요!</h2>
    <div class="searchFrame">
        <form>
            <div class="searchCondition">
              <div style="width:fit-content">
              <input type="radio" name="search"/><span>대학교 기준으로 검색</span>
              </div>
              <div style="width:fit-content">
              <input type="radio" name="search" checked="checked"/><span>지역 기준으로 검색</span>
              </div>
            </div>

            <!-- 선택한 조건들 전체를 묶는 conditions-->
            <div class ="conditions">

            <!-- 지역 기준 검색 (시, 군, 구) -->
            <div class="searchRegion">
              <div style="margin-right:5px;">
              <label>시</label>
              <select v-model="selected.si">
                <option value="" disabled selected>시를 선택해주세요.</option>
                <option v-for="(si, key) in sis" :value="key" :key="key">{{ si }}</option>
              </select>
              </div>
              
              <div style="margin-right:5px;">
              <label>구</label>
              <select :disabled="selected.si === undefined" v-model="selected.gu">
                <option value="" disabled selected>구를 선택해주세요.</option>
                <option v-for="gu in gus[selected.si]" :key="gu">{{ gu }}</option>
              </select>
              </div>

              <div style="margin-right:5px;">
              <label>동</label>
              <select :disabled="selected.gu === undefined" v-model="selected.dong">
                <option value="" disabled selected>동을 선택해주세요.</option>
                <option v-for="dong in dongs[selected.gu]" :key="dong">{{ dong }}</option>
              </select>
              </div>

            </div>

            <!-- 학교 기준 검색 (보류) -->


            

            <!-- 보증금 선택 -->
            <div class="select">
              <h4> <i class="bx bx-dollar-circle icon"></i> 보증금</h4>
              <multi-slider class="slider"></multi-slider>
            </div>

            <!-- 월세 검색 -->
            <div class="select">
            <h4> <i class="bx bx-money icon"></i>  월세 금액</h4>
            <multi-slider class="slider"></multi-slider> 
            </div>

            <!-- 평수 검색 -->
            <div class="select">
            <box-icon name='home'></box-icon>
            <h4><i class="bx bx-home icon"></i> 평수</h4>
            <multi-slider class="slider"></multi-slider> 
            </div>

            <!-- 전월세 선택 -->
            <div class="rent">
              <h4> <i class="bx bx-select-multiple icon"></i> 전/월세</h4>
              <div style="display:flex; flex-direction:row; margin-top: 10px;margin-bottom: 15px;">
                <div style="width:fit-content; margin-right: 10px;"><input type="radio" name="search"/><span>전체</span></div>
                <div style="width:fit-content; margin-right: 10px; "><input type="radio" name="search"/><span>전세</span></div>
                <div style="width:fit-content; margin-right: 10px;"><input type="radio" name="search"/><span>월세</span></div>
              </div>
            </div>

            </div>

            <div class="mrent" ondblclick="this.checked=false"></div>
            <div class="area"></div>

            <button class="searchBtn">방 둘러보기</button>

        </form>
    </div>
  </div>
</template>

<script>
import MultiSlider from "@/components/MultiSlider.vue"
export default {
  components: { MultiSlider },
  data(){
    return{

      sis: [
         "서울특별시", 
         "경기도 고양시"
      ],
      gus: [
         ["종로구", "은평구"],
         ["덕양구", "일산동구"]
      ],
      dongs:[
        [["종로구동1","종로구동2"],["은평구동1", "은평구동2"]],
        [["덕양구구동1","덕양구동2"],["일산동구동1","일산동구동2"]],
        
        
      ],

      selected: {
         si: undefined,
         gu: undefined,
         dong: undefined
      }
    }
  }
  
}
    
</script>
    

<style scoped>
/*코트라 볼드체*/
@font-face {
    font-family: 'KOTRA_BOLD-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*코트라 고딕체 */
@font-face {
    font-family: 'KOTRA_GOTHIC';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_GOTHIC.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*나눔바른고딕 */
@font-face {
 font-family: 'NanumBarunGothic';
 font-style: normal;
 font-weight: 400;
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
}

@font-face {
 font-family: 'NanumBarunGothic';
 font-style: normal;
 font-weight: 700;
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot');
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf') format('truetype')
}

@font-face {
 font-family: 'NanumBarunGothic';
 font-style: normal;
 font-weight: 300;
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot');
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf') format('truetype');
}

/*나눔스퀘어*/
@font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}


.frame{
  display: flex;
  align-items: center;
  flex-direction: column;
  accent-color: rgb(20, 138, 83);
  margin-top: 50px;
}

.searchFrame{
    background-color: white;
    box-shadow: 1px 1px 20px 1px rgb(234, 234, 234);
    width: 800px;
    height: fit-content;
    
    display: flex;
    justify-content: center;
    border-radius: 10px;
    margin-top: 10px;
    
}

.select{
  width: 600px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 50px;
  margin-left: 10px;
}


.slider{
  width: 300px;
  margin-top: 50px;
}

h2{
  margin-bottom: 5px;
  font-weight: bold;
}

h4{
  margin: 0px;
  font-family: 'NanumBarunGothic';
  width:fit-content;
}

.conditions{
  background-color: beige;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
}

.searchCondition{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
 
  font-family: 'KOTRA_GOTHIC'
}

.searchRegion{
  margin-top: 20px;
  margin-bottom: 0;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  width: 500px;
}

.searchBtn{
  background-color: rgb(59, 175, 117);
  border: none;
  border-radius: 5px;
  
  color: white;
  font-family: 'NanumBarunGothic';
  font-weight: bold;
  
  width: 100px;
  height: 30px;

  margin-top: 20px;
  margin-bottom: 30px;
}

form{
  width:700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}

.rent{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

/* select box 디자인 */
select {
  width: 100px;
  margin: .5em auto 2em auto;
  display: block;
  height: 40px;
  border: 2px solid #cdcdcd;
  border-radius: 0;
  outline: none;
}

label {
  width: 30%;
  display: block;
  margin: 0 auto;
  font-size: .9rem;
  font-family: 'NanumBarunGothic';
  font-weight: bold;
}


</style>