<script setup lang="ts">
import { computed } from 'vue';
import { yTransform } from './graph';

const { degree } = defineProps<{
    degree: number;
}>();

const yValue = computed(() => yTransform(degree));
</script>

<template>
    <line :x1="-5" :y1="yValue" :x2="5" :y2="yValue" stroke="black" />
</template>
