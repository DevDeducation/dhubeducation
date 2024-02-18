<script lang="ts">
	import type { iDashboard } from "$lib/interfaces";
	import Bag from '$lib/components/icons/Bag.svelte';
	import Cart from '$lib/components/icons/Cart.svelte';
	import Confirmed from '$lib/components/icons/Confirmed.svelte';
	import Referee from '$lib/components/icons/Referee.svelte';
	import { Classes, Dashboard } from "$lib/constants";

  export let dashboard: iDashboard

  let parent: HTMLElement
  let iconwrap: HTMLElement

  const icon = (name: string) => {
    switch (name) {
      case Dashboard.REFEREESADDED: return Referee
      case Dashboard.REFEREESCONFIRMED: return Confirmed
      case Dashboard.REFEREESPAID: return Bag
      case Dashboard.PAYOUT: return Cart
    }
  }

  const handleClick = (evt: Event) => {
    parent.classList.add(Classes.LOADING)
    iconwrap.classList.add(Classes.HIDDEN)
  }

  const className = `rounded-lg relative p-4 bt bt-${dashboard.color}`

</script>
<a href={dashboard.url} class={className} on:click={handleClick} bind:this={parent}>
  <span class="clickable"></span>
  <div class="flex items-center gap-4">
    <div class="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white dark:bg-dark-800 relative">
      <span class={`spin-loader ${dashboard.color}`}></span>
      <div bind:this={iconwrap}>
        <svelte:component this={icon(dashboard.name)} classes={dashboard.iconclasses}></svelte:component>
      </div>
    </div>
    <span class="text-xs font-medium">{dashboard.name}</span>
  </div>

  <div class="mt-4 flex items-end justify-between">
    <div>
      <h4 class="text-4xl font-bold">{dashboard.kpi}</h4>
      <p class="text-sm normal-case font-normal">{dashboard.legend}</p>
    </div>

    <span class="flex items-center gap-1 text-2xs font-bold bg-white rounded-full py-2 px-4 text-font">
      {dashboard.cta}
    </span>
  </div>
</a>