<template>
    <div>
        <main-banner-comp></main-banner-comp>
        <login-register-comp></login-register-comp>
    </div>
</template>

<script>
import MainBannerComp from "@/components/Main/MainBannerComp";
import LoginRegisterComp from '@/components/LoginRegister/LoginRegisterComp.vue';

export default {
    components:{
        MainBannerComp,
        LoginRegisterComp
    }
}
</script>

<style>

</style>