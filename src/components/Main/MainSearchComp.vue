<template>
  <div>
    <h3>원하는 방을 찾아보세요!</h3>
    <div class="searchFrame">
        <form>
            <input type="radio" name="search"/><span>대학교 기준으로 검색</span>
            <input type="radio" name="search"/><span>지역 기준으로 검색</span>
            
            <!-- 지역 기준 검색 (시, 군, 구) -->
            <div>
                <select name="sido">
                    <option>시</option>
                    <option>경기도</option>
                </select>
                <select name="gugun">
                    <option>구군</option>
                    <option>고양시 덕양구</option>
                </select>
                <select name="dong">
                    <option>동</option>
                    <option>화정동</option>
                </select>
            </div>

            <!-- 보증금 선택 -->
            <div class="select">
              <div>보증금</div>
              <div>
                <multi-slider></multi-slider>
              </div>   
            </div>

            <!-- 월세 검색 -->

            <div>월세 금액</div>
            <multi-slider></multi-slider> 

            <!-- 평수 검색 -->
            <div>평수</div>
            <multi-slider></multi-slider> 
            
            <!-- 전월세 선택 -->
            <div>전/월세</div>
            <input type="radio" name="search"/><span>전체</span>
            <input type="radio" name="search"/><span>전세</span>
            <input type="radio" name="search"/><span>월세</span>
            

            <div class="mrent" ondblclick="this.checked=false"></div>
            <div class="area"></div>

            <input type="submit" value="검색">

        </form>
    </div>
  </div>
</template>

<script>
import MultiSlider from "@/components/MultiSlider.vue"
export default {
  components: { MultiSlider },
    
}

    
</script>
    

<style scoped>

.searchFrame{
    background-color: beige;
    height: 500px;
    
    
}

.select{
  width: 400px;
}

/* 슬라이더 */
.slider {
  position: relative;
  z-index: 1;
  height: 10px;
  margin: 0 15px;
}

.slider > .track {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #c6aee7;
}

.slider > .range {
  position: absolute;
  z-index: 2;
  left: 25%;
  right: 25%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #6200ee;
}

.slider > .thumb {
  position: absolute;
  z-index: 3;
  width: 30px;
  height: 30px;
  background-color: #6200ee;
  border-radius: 50%;
}

.slider > .thumb.left {
  left: 25%;
  transform: translate(-15px, -10px);
}
.slider > .thumb.right {
  right: 25%;
  transform: translate(15px, -10px);
}

input[type="range"] {
  position: absolute;
  /* opacity로 가린 것을 이벤트도 비활성화하기 위해 */
  pointer-events: none;
  -webkit-appearance: none;
  z-index: 2;
  height: 10px;
  width: 100%;
  opacity: 0;
}

input[type="range"]::-webkit-slider-thumb {
  /* 겹쳐진 두 thumb를 모두 활성화 */
  pointer-events: all;
  width: 30px;
  height: 30px;
  border-radius: 0;
  border: 0 none;
  background-color: red;
  cursor: pointer;
  /* appearance를 해야 위의 스타일들을 볼 수 있음 */
  -webkit-appearance: none;
}




</style>