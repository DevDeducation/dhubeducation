<script lang="ts">
  import type { LatLngExpression } from "leaflet";
  import Leaflet from "./Leaflet.svelte";

  export let schools:any

  const initialView: LatLngExpression = [51.514244, 7.468429]

  $: console.log("schools from homepage map are", schools)
</script>


<div class="w-full aspect-square md:aspect-video max-h-[500px]">
  <Leaflet view={initialView} zoom={13} />
</div>