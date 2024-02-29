<script setup lang="ts">
import type { ViewerLocation, WorldParams } from '@/types';

defineProps<{
    worldParams: WorldParams;
    viewerLocation: ViewerLocation;
    timeOfDay: number;
}>();
</script>

<template>
    <canvas></canvas>
</template>
@/util
