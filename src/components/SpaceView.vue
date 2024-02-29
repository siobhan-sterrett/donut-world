<script setup lang="ts">
import type { ViewerLocation, WorldParams } from '@/util';
import { ref, onMounted, type Ref } from 'vue';

const props = defineProps<{
    worldParams: WorldParams;
    viewerLocation: ViewerLocation;
    timeOfDay: number;
}>();

const cameraPosition = ref({
    x: 0,
    y: 0,
    z: 0,
});

const canvas: Ref<HTMLCanvasElement | null> = ref(null);

function draw() {
    requestAnimationFrame(draw);

    const el = canvas.value;
    if (!el) {
        return;
    }

    const ctx = el.getContext('2d');
    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, el.width, el.height);

    ctx.strokeText(JSON.stringify(props.worldParams), 10, 20);
}

onMounted(draw);
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>
