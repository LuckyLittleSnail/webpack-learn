<template>
    <div @click="change">这是关于</div>
    <Rate :value="3.5"></Rate>
</template>

<script setup>
    import {ref} from 'vue'
    import Rate from '../components/Rate.vue'
    let score = ref(4)
</script>