<script setup lang="ts">
import { type WorldParams, type ViewerLocation, range } from '@/util';
import { xTransform, yTransform } from './graph';
import SunElevationGraphXAxis from './SunElevationGraphXAxis.vue';
import SunElevationGraphYAxis from './SunElevationGraphYAxis.vue';
const props = defineProps<{
    worldParams: WorldParams;
    viewerLocation: ViewerLocation;
}>();

const graphFunction = (hour: number): number => {
    // sin(x), just for testing purposes
    const x = hour / 24 * (2 * Math.PI);
    return 90 * Math.sin(x);
}

const xValues = Array.from(range(0, 24, 0.01));
const points = xValues.map((x) => [xTransform(x), yTransform(graphFunction(x))]);

const pointsPath = points.map(([x, y]) => `${x},${y}`).join(" ");
</script>

<template>
    <svg viewBox="-15 -325 1215 650">
        <SunElevationGraphXAxis />
        <SunElevationGraphYAxis />
        <polyline :points="pointsPath" fill="none" stroke="black" />
    </svg>
</template>

<style>
svg {
    flex-grow: 1;
    aspect-ratio: 2 / 1;
}

.axis-label {
    font-size: 20px;
}
</style>
