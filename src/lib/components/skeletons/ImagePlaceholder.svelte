<script lang="ts">
  export let square: boolean = false
  export let classes: string | null = null

  const className = square
  ? `${classes ?  classes : "w-full"} flex items-center justify-center`
  : `${classes ?  classes : "w-full"} flex items-center justify-center`
</script>
<div class={className}>
  <svg class="w-1/2 h-1/2" class:hidden={square} viewBox="0 0 180.119 139.794"><g transform="translate(-13.59 -66.639)" paint-order="fill markers stroke"><path d="m118.507 133.514-34.249 34.249-15.968-15.968-41.938 41.937H178.726z" opacity=".675" class="fill-gray-200 dark:fill-dark-500"/><circle cx="58.217" cy="108.555" r="11.773" opacity=".675" class="fill-gray-200 dark:fill-dark-500"/><path fill="none" d="M26.111 77.634h152.614v116.099H26.111z"/></g></svg>

  <svg class="w-1/2 h-1/2" class:hidden={!square} viewBox="0 0 179.91686 179.9171"><path d="m 105.92643,78.21555 -34.249,34.249 -15.968,-15.968 -41.938,41.937 h 152.374 z" opacity="0.675"  class="fill-gray-200 dark:fill-dark-500" id="path4" style="paint-order:fill markers stroke" /><circle cx="45.636429" cy="53.25655" r="11.773" opacity="0.675"  class="fill-gray-200 dark:fill-dark-500" id="circle6" style="paint-order:fill markers stroke" /><path fill="none" d="M 12.521,10.995 H 165.135 V 127.094 H 12.521 Z" id="path8" style="paint-order:fill markers stroke" /></svg>
</div>

<!-- width="680.764" height="528.354" -->