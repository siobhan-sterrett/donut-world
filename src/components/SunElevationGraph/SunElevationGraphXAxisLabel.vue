<script setup lang="ts">
import { computed } from 'vue';
import { xTransform } from './graph';

const { hour } = defineProps<{
    hour: number;
}>();

const label = computed(() => String(hour).padStart(2, '0') + ':00');
const xValue = computed(() => xTransform(hour));
const yValue = 5
</script>

<template>
    <line :x1="xValue" :y1="-5" :x2="xValue" :y2="5" stroke="black" />
    <text :x="xValue" :y="yValue" dominant-baseline="hanging" text-anchor="middle" class="x-axis-label">{{ label }}</text>
</template>

<style>
.x-axis-label {
    font-size: 20px;
}
</style>
