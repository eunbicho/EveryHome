<template>
  <div class="frame">
    <h2>이 방들은 어때요?</h2>
    <div class="resultFrame">
      <!-- <div class="map">지도</div> -->
      <div class="map-container">
        <kakao-map></kakao-map>
      </div>
      <div class="resultList">
        <div class="articleFrame">
          <v-data-table
            class="housedeals"
            :headers="headers"
            :items="housedeals"
            @click:row="detailHouse"
          ></v-data-table>
        </div>
      </div>
    </div>

    <!-- DetailModal -->
    <b-modal id="modal-lg" size="lg" title="매물 상세 정보">
      <div class="detail-container">
        <div id="roadview" class="roadview" ref="roadview"></div>
        <div id="detail">
          <h4 style="font-weight: bold; margin-bottom: 10px">
            {{ house.buildingName }}
          </h4>
          <div class="detail-item">
            <span class="detail-header">주소</span
            ><span class="detail-body">{{ house.sigungu }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">상세 주소</span
            ><span class="detail-body">{{ house.roadName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">건물 정보</span
            ><span class="detail-body">{{ house.type }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">면적</span
            ><span class="detail-body">{{ house.area }}평</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">거래일자</span
            ><span class="detail-body"
              >{{ house.dealYM }}{{ house.dealDay }}</span
            >
          </div>
          <div class="detail-item">
            <span class="detail-header">보증금</span
            ><span class="detail-body">{{ house.deposit }}만원</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">월세</span
            ><span class="detail-body">{{ house.rent }}만원</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">층</span
            ><span class="detail-body">{{ house.floor }}층</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">건축년도</span
            ><span class="detail-body">{{ house.buildYear }}년</span>
          </div>
          <div class="detail-item">
            <span class="detail-header">전/월세</span
            ><span class="detail-body">{{ house.dealType }}</span>
          </div>
        </div>
      </div>

      <template #modal-footer="{ hide }">
        <b-button @click="hide()"> 닫기 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import KakaoMap from "@/components/KakaoMap.vue";

const houseStore = "houseStore";

export default {
  components: {
    KakaoMap,
  },
  computed: {
    ...mapState(houseStore, ["housedeals"]),
  },
  data() {
    return {
      headers: [
        {
          text: "건물명",
          align: "start",
          sortable: false,
          value: "buildingName",
          width: "35%",
        },
        { text: "전/월세", value: "dealType", sortable: false, width: "17%" },
        { text: "면적(평)", value: "area", width: "18%" },
        { text: "보증금", value: "deposit", width: "15%" },
        { text: "월세", value: "rent", width: "15%" },
      ],
      house: {},
      road: "",
      markerPositions: [],
    };
  },
  watch: {
    housedeals: {
      handler() {
        console.log("housedeals changed");
        console.log(this.housedeals);
      },
    },
  },
  methods: {
    detailHouse(event, { item }) {
      this.house = item;
      this.road = this.house.sigungu + " " + this.house.roadName;
      console.log(this.house);

      if (this.kakao && this.kakao.maps) {
        this.initMap();
      } else {
        this.addKakaoMapScript();
      }
      this.$bvModal.show("modal-lg");
    },
    addKakaoMapScript() {
      console.log("addKakaoMapScript called.");
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=67a84eba9ba18c291dbbc6e7ddce22df&libraries=services`;
      document.head.appendChild(script);
    },
    initMap() {
      console.log("initMap called.");
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(this.road, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
          var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
          var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

          var position = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
          roadviewClient.getNearestPanoId(position, 50, function (panoId) {
            roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.detail {
  width: 300px;
}

.detail-item {
  margin-bottom: 5px;
}

.detail-container {
  display: flex;
  justify-content: flex-start;
}

.detail-header {
  font-weight: bold;
  font-size: 110%;
}

.detail-body {
  margin-left: 15px;
}

#roadview {
  width: 400px;
  height: 400px;
  border-radius: 20px;
}

#detail {
  margin-top: 15px;
  margin-left: 35px;
}

h2 {
  margin-bottom: 5px;
  font-weight: bold;
}

.frame {
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.resultFrame {
  background-color: white;
  box-shadow: 1px 1px 20px 1px rgb(234, 234, 234);
  width: 1500px;
  height: fit-content;

  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
}

.resultList {
  background-color: beige;
  padding: 10px;
  border-radius: 20px;
  margin-left: 15px;
}

.map {
  background-color: greenyellow;
  padding: 10px;
}

.articleFrame {
  width: 650px;
}

.map-container {
  justify-content: center;
  align-content: center;
  margin-right: 15px;
  width: 650px;
  height: 650px;
}
</style>
