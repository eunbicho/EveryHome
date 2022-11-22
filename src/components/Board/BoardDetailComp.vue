<template>
  <div class="frame">
    <v-container>
      <v-card style="width: 80%" height="600px">
        <div class="group">
        <v-card-subtitle>제목</v-card-subtitle><v-card-subtitle>[질문글]집 사려면 어떻게 해요?</v-card-subtitle>
        </div>
        <v-card-subtitle>SubTitle</v-card-subtitle>
        <v-card-text>
          Oh! Hello Vue.js!
        </v-card-text>
        <label>제목</label>
        <v-card>test</v-card>
       
        <v-card-actions>
          <v-btn outlined id="click">Click</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}

.group{
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
