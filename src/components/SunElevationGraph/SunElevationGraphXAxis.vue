<script setup lang="ts">
import { xTransform, yTransform } from './graph';
import { range } from '@/util';
import SunElevationGraphXAxisLabel from './SunElevationGraphXAxisLabel.vue';
import SunElevationGraphXAxisTick from './SunElevationGraphXAxisTick.vue';

const yValue = yTransform(0);
const minX = xTransform(0);
const maxX = xTransform(24);
const hourTickValues = range(25);
const hourLabelValues = range(4, 25, 4);
</script>

<template>
    <g id="x-axis">
        <line :x1="minX" :y1="yValue" :x2="maxX" :y2="yValue" stroke="black" />
        <SunElevationGraphXAxisTick v-for="hour in hourTickValues" :key="hour" :hour="hour" />
        <SunElevationGraphXAxisLabel v-for="hour in hourLabelValues" :key="hour" :hour="hour" />
    </g>
</template>
