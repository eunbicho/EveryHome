<template>
  <div class="frame">
    <h2>이 방들은 어때요?</h2>
    <div class="resultFrame">
      <div class="resultList">
        검색 결과 건물 리스트
        <div class="articleFrame">
          <v-data-table
            class="housedeals"
            :headers="headers"
            :items="housedeals"
          ></v-data-table>
        </div>
      </div>
      <div class="map">지도</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
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
          width: "40%",
        },
        { text: "전/월세", value: "dealType", sortable: false, width: "10%" },
        { text: "면적(평)", value: "area", width: "10%" },
        { text: "보증금", value: "deposit", width: "20%" },
        { text: "월세", value: "rent", width: "10%" },
      ],
    };
  },
};
</script>

<style scoped>
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
  height: 500px;
  background-color: beige;
  padding: 10px;
}

.map {
  background-color: greenyellow;
  padding: 10px;
}
</style>
