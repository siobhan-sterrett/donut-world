<script setup lang="ts">
import { ref } from 'vue';
import SunElevationGraph from './components/SunElevationGraph/SunElevationGraph.vue';

import type { Ref } from 'vue';
import type { WorldParams, ViewerLocation } from '@/util';

const worldParams: Ref<WorldParams> = ref({
  aspectRatio: 3.35,
});

const viewerLocation: Ref<ViewerLocation> = ref({
  azimuth: 0,
  latitude: 0,
});
</script>

<template>
  <div id="views">
    <SunElevationGraph 
      :world-params="worldParams"
      :viewer-location="viewerLocation"
    />
  </div>
  <div id="controls">
    <div class="form-entry">
      <label for="aspect-ratio-input">Toroidal Aspect Ratio</label>
      <input id="aspect-ratio-input" type="number" min="1.00" step="0.05" v-model="worldParams.aspectRatio" />
    </div>
      <div class="form-entry">
        <label for="viewer-azimuth-input">Viewer azimuth</label>
        <input id="viewer-azimuth-input" type="number" min="0.00" max="6.28" step="0.01" v-model="viewerLocation.azimuth" />
      </div>
      <div class="form-entry">
        <label for="viewer-latitude-input">Viewer latitude</label>
        <input id="viewer-latitude-input" type="number" min="-3.14" max="3.14" step="0.01" v-model="viewerLocation.latitude" />
      </div>
  </div>
</template>

<style scoped>
#views {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
