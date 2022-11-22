<template>
  <div id="map"></div>
  <!-- <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "KakaoMap",
  computed: {
    ...mapState(houseStore, ["housedeals", "markerPositions", "contents"]),
  },
  data() {
    return {
      markers: [],
      infowindow: null,
      geocoder: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=67a84eba9ba18c291dbbc6e7ddce22df&libraries=services`;
      document.head.appendChild(script);
    }
  },
  watch: {
    housedeals: {
      handler() {
        let positions = [];
        let contents = [];

        this.housedeals.forEach((housedeal) => {
          let road = housedeal.sigungu + " " + housedeal.roadName;

          this.geocoder.addressSearch(road, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              let temp = `<div style='position: absolute; left: 0px; top: 0px;'><div style='width:140px;padding:1px;text-align:center; font-weight: bold;'>${housedeal.buildingName}</div></div>`;
              //let temp = `<div style="border-radius: 20px;">${housedeal.buildingName}</div>`;
              // positions.push({
              //   content: temp,
              //   latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
              // });

              positions.push([result[0].y, result[0].x]);
              contents.push(temp);
            }
          });
        });

        this.SET_MARKER_POSITIONS(positions);
        this.SET_CONTENTS(contents);
      },
    },
    markerPositions: {
      handler() {
        this.displayMarker(this.markerPositions, this.contents);
      },
    },
  },
  methods: {
    ...mapMutations(houseStore, ["SET_MARKER_POSITIONS", "SET_CONTENTS"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      var geocoder = new kakao.maps.services.Geocoder();
      console.log(geocoder);
      this.geocoder = geocoder;

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions, contents) {
      let positions = [];

      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      for (var i = 0; i < markerPositions.length; i++) {
        positions.push(
          new kakao.maps.LatLng(markerPositions[i][0], markerPositions[i][1])
        );

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i], // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: contents[i], // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(this.map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#map {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
