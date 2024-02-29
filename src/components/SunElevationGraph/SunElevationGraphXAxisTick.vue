<script setup lang="ts">
import { computed } from 'vue';
import { xTransform } from './graph';

const { hour } = defineProps<{
    hour: number;
}>();

const xValue = computed(() => xTransform(hour));
</script>

<template>
    <line :x1="xValue" :y1="-5" :x2="xValue" :y2="5" stroke="black" />
</template>
