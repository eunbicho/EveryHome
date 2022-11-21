<template>
  <div>
    <Slider
      v-model="value"
      :format="format"
      :step="parseInt(step)"
      :min="parseInt(min)"
      :max="parseInt(max)"
      @input="move"
    />
  </div>
</template>

<script>
import Slider from "@vueform/slider/dist/slider.vue2.js";

export default {
  components: {
    Slider,
  },
  props: {
    unit: String,
    low: String,
    high: String,
    min: String,
    max: String,
    step: String,
  },
  data() {
    return {
      value: [20, 50],
      format: {
        suffix: this.unit,
        decimals: 0,
      },
    };
  },
  created() {
    this.value[0] = parseInt(this.low);
    this.value[1] = parseInt(this.high);
  },
  step: {
    type: Number,
    required: false,
    default: 10,
  },
  methods: {
    move() {
      this.$emit("slide-change", [
        this.value[0],
        this.value[1],
        parseInt(this.step),
      ]);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
