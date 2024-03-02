<script setup lang="ts">
const worldMajorRadius = defineModel<number>('worldMajorRadius');
const worldMinorRadius = defineModel<number>('worldMinorRadius');
const sunMajorAxis = defineModel<number>('sunMajorAxis');
const sunMinorAxis = defineModel<number>('sunMinorAxis');
const viewerAzimuth = defineModel<number>('viewerAzimuth');
const viewerLatitude = defineModel<number>('viewerLatitude');
</script>

<template>
    <div id="controls">
        <div class="form-entry-collection">
            <header>World Parameters</header>
            <div class="form-entry">
                <label>Major Radius</label>
                <input type="number" min="0.0" step="0.1" v-model="worldMajorRadius" />
            </div>
            <div class="form-entry">
                <label>Minor Radius</label>
                <input type="number" min="0.0" step="0.1" v-model="worldMinorRadius" />
            </div>
        </div>
        <div class="form-entry-collection">
            <header>Sun Parameters</header>
            <div class="form-entry">
                <label>Major Axis</label>
                <input type="number" min="0.0" step="0.1" v-model="sunMajorAxis" />
            </div>
            <div class="form-entry">
                <label>Minor Axis</label>
                <input type="number" min="0.0" step="0.1" v-model="sunMinorAxis" />
            </div>
        </div>
        <div class="form-entry-collection">
            <header>Viewer Location</header>
            <div class="form-entry">
                <label>Azimuth</label>
                <input type="number" min="0.0" max="360.0" step="0.1" v-model="viewerAzimuth" />
            </div>
            <div class="form-entry">
                <label>Latitude</label>
                <input type="number" min="-180.0" max="180.0" step="0.1" v-model="viewerLatitude" />
            </div>
        </div>
    </div>
</template>
