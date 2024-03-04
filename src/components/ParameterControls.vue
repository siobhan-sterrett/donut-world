<script setup lang="ts">
const worldMajorRadius = defineModel<number>('worldMajorRadius',);
const worldMinorRadius = defineModel<number>('worldMinorRadius');
const sunOrbitalRadius = defineModel<number>('sunOrbitalRadius');
const viewerAzimuth = defineModel<number>('viewerAzimuth', {
    get(value) { return Math.round(value * 180 / Math.PI) },
    set(value) { return value * Math.PI / 180; }
});
const viewerLatitude = defineModel<number>('viewerLatitude', {
    get(value) { return Math.round(value * 180 / Math.PI) },
    set(value) { return value * Math.PI / 180; }
});
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
                <label>Orbital Radius</label>
                <input type="number" min="0.0" step="0.1" v-model="sunOrbitalRadius" />
            </div>
        </div>
        <div class="form-entry-collection">
            <header>Viewer Location</header>
            <div class="form-entry">
                <label>Azimuth</label>
                <input type="number" min="-360" max="360" step="1" v-model="viewerAzimuth" />
            </div>
            <div class="form-entry">
                <label>Latitude</label>
                <input type="number" min="-180" max="180" step="1" v-model="viewerLatitude" />
            </div>
        </div>
    </div>
</template>
