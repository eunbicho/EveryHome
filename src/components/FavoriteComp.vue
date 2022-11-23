<template>
  <v-data-table
    :headers="headers"
    :items="favorites"
    sort-by="rentCnt"
    sort-desc="true"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="font-size: 27px">관심지역 목록</v-toolbar-title>

        <v-spacer></v-spacer>

        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="getGugun"
          class="select"
        ></b-form-select>

        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="getDong"
          style="border-radius: 7px"
        ></b-form-select>

        <b-form-select
          v-model="dongCode"
          :options="dongs"
          style="border-radius: 7px"
        ></b-form-select>

        <v-btn color="success" class="mb-2" @click="addFavorite">
          관심지역 추가
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="detailItem(item)">
        mdi-magnify
      </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { sidoList, gugunList, dongList } from "@/api/house";
import { listFavorite, addFavorite, deleteFavorite } from "@/api/member";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data: () => ({
    msg: "",
    sidoCode: null,
    gugunCode: null,
    dongCode: null,
    sidos: [{ value: null, text: "시/도 선택" }],
    guguns: [{ value: null, text: "구/군 선택" }],
    dongs: [{ value: null, text: "동 선택" }],
    headers: [
      {
        text: "지역",
        align: "start",
        sortable: false,
        value: "region",
      },
      { text: "매물 수 (전세)", value: "leaseCnt" },
      { text: "매물 수 (월세)", value: "rentCnt" },
      { text: "평균 전세가 (만원)", value: "avgLeasePrice" },
      { text: "평균 월세 보증금 (만원)", value: "avgRentDeposit" },
      { text: "평균 월세 (만원)", value: "avgRentPrice" },
      { text: "", value: "actions", sortable: false },
    ],
    favorites: [],
  }),

  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },

  created() {
    if (!this.userInfo) {
      alert("회원만 사용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }

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

    this.getFavorites();
  },

  methods: {
    makeToast(variant = null) {
      this.$bvToast.toast(this.msg, {
        title: variant == "danger" ? "error" : "success",
        variant: variant,
        solid: true,
        autoHideDelay: 1500,
      });
    },
    addFavorite() {
      if (!this.dongCode) {
        this.msg = "지역을 선택해주세요.";
        this.makeToast("danger");
        return;
      }

      addFavorite(
        {
          userId: this.userInfo.userId,
          dongCode: this.dongCode,
        },
        ({ data }) => {
          if (data == "success") {
            this.msg = "관심지역 추가 성공!";
            this.makeToast("success");
            this.getFavorites();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getFavorites() {
      listFavorite(
        this.userInfo.userId,
        ({ data }) => {
          this.favorites = [];

          data.forEach((favorite) => {
            let temp = {};
            temp.dongCode = favorite.dongCode;
            temp.region =
              favorite.sidoName +
              " " +
              favorite.gugunName +
              " " +
              favorite.dongName;
            temp.leaseCnt = favorite.leaseCnt;
            temp.rentCnt = favorite.rentCnt;
            temp.avgLeasePrice = favorite.avgLeasePrice;
            temp.avgRentDeposit = favorite.avgRentDeposit;
            temp.avgRentPrice = favorite.avgRentPrice;

            this.favorites.push(temp);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
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

    detailItem(item) {
      console.log("dongCode send ", item.dongCode);
      this.$router.push({ path: "/", query: { dongCode: item.dongCode } });
    },

    deleteItem(item) {
      console.log("item ", item);
      deleteFavorite(
        {
          userId: this.userInfo.userId,
          dongCode: item.dongCode,
        },
        ({ data }) => {
          if (data == "success") {
            this.msg = "관심지역 삭제 성공!";
            this.makeToast("success");
            this.getFavorites();
          }
        },
        (error) => {
          console.log(error);
          this.msg = "관심지역 삭제 중 에러 발생!";
          this.makeToast("danger");
        }
      );
    },
  },
};
</script>

<style>
.v-application .mb-2 {
  margin-bottom: 0px !important;
}

.custom-select {
  margin-right: 15px;
  border-radius: 7px !important;
  width: 180px !important;
  height: 36px !important;
}
</style>
