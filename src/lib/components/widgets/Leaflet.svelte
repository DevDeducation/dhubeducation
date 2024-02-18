<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount, setContext } from "svelte";
  import { Constants } from "~/lib";

  let map: L.Map | undefined;
  let mapElement: HTMLDivElement;

  export let bounds: L.LatLngBoundsExpression | undefined = undefined
  export let view: L.LatLngExpression
  export let zoom: number

  onMount(() => {
    if (!bounds && (!view || !zoom)) {
      throw new Error('Must set either bounds, or view and zoom')
    }

    map = L.map(mapElement);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  });

  onDestroy(() => {
    map?.remove()
    map = undefined
  })

  setContext(Constants.MAP, {
    getMap: () => map
  })

  $: if (map) {
    if (bounds) {
      map.fitBounds(bounds)
    } else if (view && zoom) {
      map.setView(view, zoom)
    }
  }
</script>

<div class="w-full h-full" bind:this={mapElement}>
  <slot />
</div>
