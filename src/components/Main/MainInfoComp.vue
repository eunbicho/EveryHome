<template>
  <div class="infoFrame">
    <h2 style="font-weight: bold; margin-bottom: 25px">
      에브리홈이 알려주는 부동산 가이드
    </h2>

    <b-card-group deck>
      <b-card
        img-src="https://pixabay.com/get/g51f6c67befe30a48ff381c5ceb388456430146de0fd5ca868823c8d5c0b16371dc77f6da20352cc4f6f854f9a282c3d34ffc04be1f831d38da5f173948fa9805bcf89255c3477e4be42120336edd31df_1920.jpg"
        img-alt="Card image"
        img-top
        style="width: 250px; height: 300px"
        @click="link1"
      >
        <b-card-text>
          <div class="card-title">부동산 상식</div>
          <span>임대차 계약서 작성 시</span><br />
          <span>이것만 알아두세요~</span>
        </b-card-text>
      </b-card>

      <b-card
        img-src="https://pixabay.com/get/g51f6c67befe30a48ff381c5ceb388456430146de0fd5ca868823c8d5c0b16371dc77f6da20352cc4f6f854f9a282c3d34ffc04be1f831d38da5f173948fa9805bcf89255c3477e4be42120336edd31df_1920.jpg"
        img-alt="Card image"
        img-top
        style="width: 250px; height: 300px"
        @click="link2"
      >
        <b-card-text>
          <div class="card-title">부동산 상식</div>
          <span>알아두면 좋은 부동산 용어,</span><br />
          <span>행복주택 기본용어!</span>
        </b-card-text>
      </b-card>

      <b-card
        img-src="https://pixabay.com/get/g51f6c67befe30a48ff381c5ceb388456430146de0fd5ca868823c8d5c0b16371dc77f6da20352cc4f6f854f9a282c3d34ffc04be1f831d38da5f173948fa9805bcf89255c3477e4be42120336edd31df_1920.jpg"
        img-alt="Card image"
        img-top
        style="width: 250px; height: 300px"
        @click="link3"
      >
        <b-card-text>
          <div class="card-title">부동산 상식</div>
          <span>알아두면 좋은</span><br />
          <span>청년 주거 지원</span>
        </b-card-text>
      </b-card>

      <b-card
        img-src="https://pixabay.com/get/g5d2a076b7a2c9bac75ef5388a1d4deb9b27e30cae4574ff060be3acb1d62abfb28fad64e6a8810ae9b107b5cab9f1c42a88ad67e1b61196cd5f7ee854d22ae385a48201210516f34234bfc123111b239_1920.jpg"
        img-alt="Card image"
        img-top
        style="width: 250px; height: 300px"
        @click="link4"
      >
        <b-card-text>
          <div class="card-title">생활 꿀팁</div>
          <span>방 구하기 전 꼭 확인해야할</span><br />
          <span>매물 체크 리스트</span>
        </b-card-text>
      </b-card>

      <b-card
        img-src="https://pixabay.com/get/g5d2a076b7a2c9bac75ef5388a1d4deb9b27e30cae4574ff060be3acb1d62abfb28fad64e6a8810ae9b107b5cab9f1c42a88ad67e1b61196cd5f7ee854d22ae385a48201210516f34234bfc123111b239_1920.jpg"
        img-alt="Card image"
        img-top
        style="width: 250px; height: 300px"
        @click="link5"
      >
        <b-card-text>
          <div class="card-title">생활 꿀팁</div>
          <span>이사 준비한다면 필독!</span><br />
          <span>이사 체크 리스트</span>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  methods: {
    link1() {
      window.open(
        "https://post.naver.com/viewer/postView.nhn?volumeNo=26596142&memberNo=2120568"
      );
    },
    link2() {
      window.open(
        "https://post.naver.com/viewer/postView.nhn?volumeNo=26067452&memberNo=2120568"
      );
    },
    link3() {
      window.open(
        "https://post.naver.com/viewer/postView.nhn?volumeNo=26344001&memberNo=2120568"
      );
    },
    link4() {
      window.open(
        "https://post.naver.com/viewer/postView.nhn?volumeNo=25443036&memberNo=2120568"
      );
    },
    link5() {
      window.open(
        "https://post.naver.com/viewer/postView.nhn?volumeNo=25389507&memberNo=2120568"
      );
    },
  },
};
</script>

<style>
.infoFrame {
  display: flex;
  align-items: center;
  flex-direction: column;
  accent-color: rgb(20, 138, 83);
  margin-top: 50px;
}

.card-title {
  font-weight: 600;
  font-size: 24px;
}

.card:hover {
  box-shadow: 5px 5px 5px 5px rgba(192, 192, 192, 0.445);
}
</style>
