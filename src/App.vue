<script setup lang="ts">
import { ref } from 'vue';
import SpaceView from './components/SpaceView.vue';
import SunElevationGraph from './components/SunElevationGraph/SunElevationGraph.vue';

import type { SceneParams } from './params';
import ParameterControls from './components/ParameterControls.vue';

const params = ref<SceneParams>({
  world: {
    majorRadius: 10,
    minorRadius: 3,
  },
  sun: {
    majorAxis: 15,
    minorAxis: 15,
  },
  viewer: {
    azimuth: 0,
    latitude: 0,
  }
});
</script>

<template>
  <div id="views">
    <SunElevationGraph :params="params" />
    <SpaceView :params="params" />
  </div>
  <ParameterControls 
    v-model:worldMajorRadius="params.world.majorRadius"
    v-model:worldMinorRadius="params.world.minorRadius" 
    v-model:sunMajorAxis="params.sun.majorAxis" 
    v-model:sunMinorAxis="params.sun.minorAxis" 
    v-model:viewerAzimuth="params.viewer.azimuth" 
    v-model:viewerLatitude="params.viewer.latitude" 
  />
</template>

<style scoped>
#views {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
</style>
