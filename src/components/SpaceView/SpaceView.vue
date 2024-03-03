<script setup lang="ts">
import { ref, onMounted, type Ref, watch } from 'vue';
import { type SceneParams } from '@/params';
import { SpaceViewScene } from './scene';

const { params } = defineProps<{
    params: SceneParams;
}>();

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
let scene: SpaceViewScene = new SpaceViewScene();
let animationFrame: number | undefined = undefined;

const render = () => {
    animationFrame = requestAnimationFrame(render);
    scene.render();
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    scene.setCanvas(canvas);
    scene.updateParams(params);
    render();
});

watch(params, (params) => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    scene.updateParams(params);
    render();
})
</script>

<template>
    <div id="canvas-container">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<style scoped>
#canvas-container {
    width: 50%;
    flex: 1;
}

canvas {
    width: 100%;
    height: 100%;
}
</style>
