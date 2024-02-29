<script setup lang="ts">
import { computed } from 'vue';
import { yTransform } from './graph';

const { degree } = defineProps<{
    degree: number;
}>();

const label = computed(() => `${degree}°`);
const xValue = -5;
const yValue = computed(() => yTransform(degree));
</script>

<template>
    <text :x="xValue" :y="yValue" dominant-baseline="middle" text-anchor="end" class="y-axis-label">{{ label }}</text>
</template>

<style>
.y-axis-label {
    font-size: 20px;
}
</style>
