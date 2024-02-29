<script setup lang="ts">
import { xTransform, yTransform } from './graph';
import { range } from '@/util';
import SunElevationGraphYAxisTick from './SunElevationGraphYAxisTick.vue';
import SunElevationGraphYAxisLabel from './SunElevationGraphYAxisLabel.vue';

const xValue = xTransform(0);
const minY = yTransform(-90);
const maxY = yTransform(90);

const degreeTickValues = range(-90, 91, 15);
const degreeLabelValues = range(-90, 91, 15);
</script>

<template>
    <g id="y-axis">
        <line :x1="xValue" :y1="minY" :x2="xValue" :y2="maxY" stroke="black" />
        <SunElevationGraphYAxisTick v-for="degree in degreeTickValues" :key="degree" :degree="degree" />
        <SunElevationGraphYAxisLabel v-for="degree in degreeLabelValues" :key="degree" :degree="degree" />
    </g>
</template>
