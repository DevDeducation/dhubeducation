<script lang="ts"> 
	import type { iButton, iButtonOptions } from "$lib/interfaces";
	import { utilsstore } from "$lib/stores/utilsstore";

  export let options: iButton

  const { text, isAnchorLink, btnType, href, padding, height, otherclasses, dataname, width, borderradius } = options

  const buttonOptions: iButtonOptions = {
    padding, height, otherclasses, width, borderradius
  }

  const classNames = $utilsstore.btnClasses(buttonOptions) 
</script>

{#if isAnchorLink}
<a aria-label={text} href={href} class={classNames.join(" ")} data-name={dataname} on:click>
  <span class="clickable" data-name={dataname}></span>
  <span class="spin-loader"></span>
  <span class="txt">{text}</span> 
</a>
{:else}
<button aria-label={`${text} button`} type={btnType} class={classNames.join(" ")} data-name={dataname} on:click>
  <span class="clickable" data-name={dataname}></span>
  <span class="spin-loader"></span>
  <span class="txt">{text}</span>
</button>
{/if} 