<template>
  <div class="frame">
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />

    <h2>원하는 방을 찾아보세요!</h2>
    <div class="searchFrame">
      <form class="searchForm">
        <!-- 선택한 조건들 전체를 묶는 conditions-->
        <div class="conditions">
          <div style="margin-left: 35px; margin-top: 20px">
            <h4><i class="bx bx-current-location icon"></i> 지역 선택</h4>
            <b-row class="mt-4 mb-4 text-center">
              <b-col>
                <b-form-select
                  v-model="sidoCode"
                  :options="sidos"
                  @change="getGugun"
                  style="margin-left: 20px; border-radius: 7px"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="gugunCode"
                  :options="guguns"
                  @change="getDong"
                  style="border-radius: 7px"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="dongCode"
                  :options="dongs"
                  @change="curDongCode"
                  style="border-radius: 7px"
                ></b-form-select>
              </b-col>
              <button class="btn-favorite" @click.prevent="favorite">
                관심지역 추가
              </button>
              <b-col>
                <b-alert
                  :show="dismissCountDown"
                  fade
                  variant="success"
                  @dismiss-count-down="countDownChanged"
                  class="alert-favorite"
                >
                  추가 성공!
                </b-alert>
                <b-alert
                  :show="dismissCountDown2"
                  fade
                  variant="danger"
                  @dismiss-count-down="countDownChanged2"
                  class="alert-favorite"
                >
                  에러 발생!
                </b-alert>
              </b-col>
            </b-row>
          </div>
          <!-- 학교 기준 검색 (보류) -->

          <div class="container">
            <div class="item">
              <!-- 보증금 선택 -->
              <div class="select">
                <h4><i class="bx bx-dollar-circle icon"></i> 보증금</h4>
                <multi-slider
                  class="slider"
                  low="300"
                  high="1000"
                  min="0"
                  max="5000"
                  unit="만원"
                  step="50"
                  @slide-change="setCondition"
                  style="margin-left: 30px"
                ></multi-slider>
              </div>
            </div>

            <div class="item">
              <!-- 월세 검색 -->
              <div class="select">
                <h4><i class="bx bx-money icon"></i> 월세 금액</h4>
                <multi-slider
                  class="slider"
                  low="30"
                  high="50"
                  min="0"
                  max="150"
                  unit="만원"
                  step="5"
                  @slide-change="setCondition"
                  style="margin-left: 30px"
                ></multi-slider>
              </div>
            </div>

            <div class="item">
              <!-- 평수 검색 -->
              <div class="select">
                <h4><i class="bx bx-home icon"></i> 평수</h4>
                <multi-slider
                  class="slider"
                  low="5"
                  high="15"
                  min="0"
                  max="40"
                  unit="평"
                  step="1"
                  @slide-change="setCondition"
                  style="margin-left: 30px"
                ></multi-slider>
              </div>
            </div>

            <div class="item">
              <!-- 전월세 선택 -->
              <div class="rent">
                <h4><i class="bx bx-select-multiple icon"></i> 전/월세</h4>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;
                    margin-bottom: 15px;
                  "
                >
                  <div
                    style="
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="dealtype"
                      id="all"
                      checked="checked"
                      v-model="searchCondition.dealType"
                      value="0"
                    /><label for="all">전체</label>
                  </div>
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="dealtype"
                      id="j"
                      v-model="searchCondition.dealType"
                      value="1"
                    /><label for="j">전세</label>
                  </div>
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="dealtype"
                      id="w"
                      v-model="searchCondition.dealType"
                      value="2"
                    /><label for="w">월세</label>
                  </div>
                </div>
              </div>

              <!-- 주택 종류 선택 -->
              <div class="hometype">
                <h4><i class="bx bx-select-multiple icon"></i> 집 종류</h4>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;
                    margin-bottom: 15px;
                  "
                >
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="hometype"
                      id="all2"
                      checked="checked"
                      v-model="searchCondition.type"
                      value="0"
                    /><label for="all2">전체</label>
                  </div>
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="hometype"
                      id="y"
                      v-model="searchCondition.type"
                      value="1"
                    /><label for="y">연립다세대</label>
                  </div>
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="hometype"
                      id="apart"
                      v-model="searchCondition.type"
                      value="2"
                    /><label for="apart">아파트</label>
                  </div>
                  <div
                    style="
                      width: fit-content;
                      margin-right: 10px;
                      display: flex;
                      flex-direction: row;
                    "
                  >
                    <input
                      type="radio"
                      name="hometype"
                      id="ot"
                      v-model="searchCondition.type"
                      value="3"
                    /><label for="ot">오피스텔</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="search-btn-container">
          <button
            class="searchBtn"
            @click.prevent="search"
            style="margin-right: 15px"
          >
            매물 검색
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MultiSlider from "@/components/MultiSlider.vue";
import { sidoList, gugunList, dongList, listHouseDeal } from "@/api/house";
import { addFavorite } from "@/api/member";
import { mapState, mapMutations } from "vuex";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  components: { MultiSlider },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      sidos: [{ value: null, text: "시/도 선택" }],
      guguns: [{ value: null, text: "구/군 선택" }],
      dongs: [{ value: null, text: "동 선택" }],
      searchCondition: {
        dongCode: "",
        depositLow: 300,
        depositHigh: 1000,
        rentLow: 30,
        rentHigh: 50,
        areaLow: 5,
        areaHigh: 15,
        dealType: 0,
        type: 0,
      },
      dismissSecs: 1,
      dismissCountDown: 0,
      dismissSecs2: 1,
      dismissCountDown2: 0,
    };
  },
  computed: {
    ...mapState(houseStore, ["housedeals"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.clearSidoList();
    sidoList(
      ({ data }) => {
        data.forEach((sido) => {
          this.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
        });
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.$route.query.dongCode) {
      this.sidoCode = this.$route.query.dongCode.substring(0, 2);

      this.getGugun();
      this.gugunCode = this.$route.query.dongCode.substring(0, 5);

      this.getDong();
      this.dongCode = this.$route.query.dongCode;

      this.$router.replace({ query: [] });
    }
  },
  methods: {
    ...mapMutations(houseStore, ["SET_HOUSEDEALS"]),
    getGugun() {
      this.clearGugunList();
      this.clearDongList();
      const param = { sido: this.sidoCode };
      gugunList(
        param,
        ({ data }) => {
          data.forEach((gugun) => {
            this.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong() {
      this.clearDongList();
      const param = { gugun: this.gugunCode };
      dongList(
        param,
        ({ data }) => {
          data.forEach((dong) => {
            this.dongs.push({ value: dong.dongCode, text: dong.dongName });
          });
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("dongCode: ", this.dongs);
    },
    clearSidoList() {
      this.sidos = [{ value: null, text: "시/도 선택" }];
    },
    clearGugunList() {
      this.guguns = [{ value: null, text: "구/군 선택" }];
    },
    clearDongList() {
      this.dongs = [{ value: null, text: "동 선택" }];
    },
    curDongCode() {
      this.searchCondition.dongCode = this.dongCode;
    },
    setCondition(value) {
      if (value[2] == 50) {
        this.searchCondition.depositLow = value[0];
        this.searchCondition.depositHigh = value[1];
      } else if (value[2] == 5) {
        this.searchCondition.rentLow = value[0];
        this.searchCondition.rentHigh = value[1];
      } else if (value[2] == 1) {
        this.searchCondition.areaLow = value[0];
        this.searchCondition.areaHigh = value[1];
      }

      console.log(this.searchCondition);
    },
    search() {
      if (!this.searchCondition.dongCode) {
        alert("지역을 선택해주세요.");
        return;
      }

      this.searchCondition.dealType = parseInt(this.searchCondition.dealType);
      this.searchCondition.type = parseInt(this.searchCondition.type);

      listHouseDeal(
        this.searchCondition,
        ({ data }) => {
          // console.log(data);
          this.SET_HOUSEDEALS(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    favorite() {
      if (!this.userInfo) {
        alert("회원만 사용할 수 있는 기능입니다.");
        return;
      }

      if (!this.searchCondition.dongCode) {
        alert("지역을 선택해주세요.");
        return;
      }

      addFavorite(
        { userId: this.userInfo.userId, dongCode: this.dongCode },
        ({ data }) => {
          console.log(data);
          this.showAlert();
        },
        (error) => {
          console.log(error);
          this.showAlert2();
        }
      );
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    countDownChanged2(dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2;
    },
    showAlert2() {
      this.dismissCountDown2 = this.dismissSecs2;
    },
  },
};
</script>

<style scoped>
/*코트라 볼드체*/
@font-face {
  font-family: "KOTRA_BOLD-Bold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

/*코트라 고딕체 */
@font-face {
  font-family: "KOTRA_GOTHIC";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/KOTRA_GOTHIC.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

/*나눔바른고딕 */
@font-face {
  font-family: "NanumBarunGothic";
  font-style: normal;
  font-weight: 400;
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
      format("embedded-opentype"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
      format("woff"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
      format("truetype");
}

@font-face {
  font-family: "NanumBarunGothic";
  font-style: normal;
  font-weight: 700;
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot");
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix")
      format("embedded-opentype"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff")
      format("woff"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf")
      format("truetype");
}

@font-face {
  font-family: "NanumBarunGothic";
  font-style: normal;
  font-weight: 300;
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot");
  src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix")
      format("embedded-opentype"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff")
      format("woff"),
    url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf")
      format("truetype");
}

/*나눔스퀘어*/
@font-face {
  font-family: "NanumSquareNeo-Variable";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

.frame {
  display: flex;
  align-items: center;
  flex-direction: column;
  accent-color: rgb(20, 138, 83);
  margin-top: 50px;
}

.searchFrame {
  background-color: white;
  box-shadow: 1px 1px 20px 1px rgb(234, 234, 234);
  width: 1500px;
  height: fit-content;

  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
}

.select {
  width: 600px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.slider {
  width: 500px;
  margin-top: 50px;
}

h2 {
  margin-bottom: 5px;
  font-weight: bold;
}

h4 {
  margin: 0px;
  font-family: "NanumBarunGothic";
  width: fit-content;
}

.conditions {
  background-color: beige;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 20px;
}

.searchCondition {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;

  font-family: "KOTRA_GOTHIC";
}

.searchRegion {
  margin-top: 20px;
  margin-bottom: 0;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  width: 500px;
}

.searchBtn {
  background-color: rgb(59, 175, 117);
  border: none;
  border-radius: 5px;

  color: white;
  font-family: "NanumBarunGothic";
  font-weight: bold;

  width: 130px;
  height: 35px;

  margin-top: 20px;
  margin-bottom: 30px;
}

.btn-favorite {
  background-color: rgb(59, 175, 117);
  border: none;
  border-radius: 5px;

  color: white;
  font-family: "NanumBarunGothic";
  font-weight: bold;

  width: 130px;
  height: 35px;

  margin-top: 10px;
  margin-left: 15px;
}

form {
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.rent {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.hometype {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

/* select box 디자인 */
select {
  width: 250px;
  margin: 0.5em auto 2em auto;
  display: block;
  height: 40px;
  border: 2px solid #cdcdcd;
  border-radius: 0;
  outline: none;
  background-color: white;
}

label {
  display: block;
  margin: 0 auto;
  font-size: 0.9rem;
  font-family: "NanumBarunGothic";
  font-weight: bold;
  margin-left: 10px;
}

.searchForm {
  width: 1300px;
}

.col {
  flex-grow: 0;
  height: 60px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 0 0 0 0;
}

.item {
  margin-left: 20px;
}

.search-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.alert-favorite {
  width: 130px;
  height: 35px;

  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: 15px;

  align-content: center;
  justify-content: center;
}

.alert {
  padding: 0.35rem;
}
</style>
