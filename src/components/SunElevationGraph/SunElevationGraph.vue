<script setup lang="ts">
import { range } from '@/util';
import { xTransform, yTransform } from './graph';
import SunElevationGraphXAxis from './SunElevationGraphXAxis.vue';
import SunElevationGraphYAxis from './SunElevationGraphYAxis.vue';
import { computed } from 'vue';
import { sunPath, type SceneParams, viewerTransform } from '@/params';

const { params } = defineProps<{
    params: SceneParams;
}>();

const sunPosition = computed(() => sunPath(params.sun));
const sunAltitude = computed(() => {
    const transform = viewerTransform(params.world, params.viewer);
    return (hour: number): number => {
        const p = transform(sunPosition.value(hour));
        const theta = Math.atan2(p.z, Math.sqrt(p.x * p.x + p.y * p.y));
        return theta * 180 / Math.PI;
    }
});

const xValues = Array.from(range(0, 48, 0.01));
const pointsPath = computed(() => {
    return xValues.map((x) => [xTransform(x), yTransform(sunAltitude.value(x))]).map(([x, y]) => `${x},${y}`).join(" ");
});
</script>

<template>
    <div id="sun-elevation-graph-container">
        <svg viewBox="-15 -325 1215 650">
            <SunElevationGraphXAxis />
            <SunElevationGraphYAxis />
            <polyline :points="pointsPath" fill="none" stroke="black" />
        </svg>
    </div>
</template>

<style scoped>
#sun-elevation-graph-container {
    width: 50%;
    height: 100%;
}

svg {
    aspect-ratio: 2 / 1;
}
</style>
