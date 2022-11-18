<template>
  <div>
    <Slider v-model="value" :format="format" :step="step"/>
  </div>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'

export default {
    components:{
        Slider,
    },
    data(){
        return {
            value: [20, 50],
            format: function (value) {
                return `${Math.round(value)}만원`
            },
            step: 5,
            
        }
    },
    step: {
        type: Number,
        required: false,
        default: 10,
    }
}


</script>

<style src="@vueform/slider/themes/default.css">

</style>