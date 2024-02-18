<script lang="ts">
	import type { iSector } from '$lib/interfaces';

	export let sector: iSector;
  const absoluteClasses = "flex justify-center items-center absolute rounded-[50px] bottom-4 left-1/2 -translate-x-1/2 text-center w-max py-2 px-4 bg-primary/60 text-white sub-title uppercase font-bold"
  const contentClasses = "bottom-0 left-0 w-full py-2 w-full"
  const absoluteClassName = absoluteClasses
</script>

<div class="relative">
  <div class="relative w-full">
    <img src={sector.img} class="aspect-[1920/1080] w-full rounded-lg" alt={sector.name}/>
      <div class={absoluteClassName}>
        {sector.name}
      </div>
  </div>
  <div class={contentClasses}>
    { sector.content }
  </div>
</div>