<script setup lang="ts">
import { range } from '@/util';
import { ref, onMounted, type Ref, computed } from 'vue';
import { sunPath, type SceneParams } from '@/params';
import { BufferGeometry, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TorusGeometry, Vector3, WebGLRenderer } from 'three';

const { params } = defineProps<{
    params: SceneParams;
}>();

const sunPosition = computed(() => sunPath(params.sun));

const cameraPosition = ref(new Vector3(0, -20, 20));

const canvas: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
    const el = canvas.value;
    if (!el) return;

    const rect = el.parentElement!.getBoundingClientRect();
    el.width = rect.width;
    el.height = rect.height;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, el.width / el.height);
    const renderer = new WebGLRenderer({ canvas: el });
    renderer.setSize(el.width, el.height);

    const geometry = new TorusGeometry(10, 3);
    const material = new MeshBasicMaterial({ color: 0x0000ff });
    const torus = new Mesh(geometry, material);
    scene.add(torus);
    
    const torusCenter = new Vector3(0, 0, 0);
    camera.position.set(cameraPosition.value.x, cameraPosition.value.z, cameraPosition.value.z)
    camera.lookAt(torusCenter);

    const sunPathPoints = Array.from(range(0, 48, 0.01)).map((t) => sunPosition.value(t));
    const sunPathGeometry = new BufferGeometry().setFromPoints(sunPathPoints);
    const sunPathMaterial = new LineBasicMaterial({ color: 0xffffff });
    const sunPath = new Line(sunPathGeometry, sunPathMaterial);

    scene.add(sunPath);

    const animate = (() => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    });

    animate();
})
</script>

<template>
    <div id="canvas-container">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<style scoped>
#canvas-container {
    width: 50%;
    flex: 1;
}
</style>
