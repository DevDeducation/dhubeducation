<script lang="ts">
	import type { iSlider } from "$lib";
  import Slide from "./Slide.svelte";

  export let sliders: iSlider[]
</script>

{#each sliders as { background, title, subline, href, text }, id}
<Slide animate {background} id={id.toString()}>
  <div class="flex flex-col items-center gap-4 scale-[1]">
    <!-- <h2>{title}</h2> -->
    <p class="flex flex-col">{@html subline}</p>
    <a { href } class="bt bt-white !w-fit py-3 px-8 opacity-80">{title}</a>
  </div>
</Slide>
{/each}
