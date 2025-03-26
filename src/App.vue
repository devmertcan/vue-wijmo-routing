<template>
  <div class="body">

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import "@grapecity/wijmo.styles/wijmo.css";
import "leaflet/dist/leaflet.css";
export default {
  name: "App",
};
</script>
<style scoped>
  .body{
    /* background-color: #b2e0ff; */
    height: 100vh;
  }
</style>