<script lang="ts">
  import { clockstore } from '$lib/stores/utilsstore';
  import { Clock } from '$lib/common';
  import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

  $: console.log({ clockstore: $clockstore });

  $: days = $clockstore?.days
  $: hours = $clockstore?.hours
  $: minutes = $clockstore?.minutes
  $: seconds = $clockstore?.seconds
  $: hidden = !$clockstore || $clockstore.t <= 0

  $: list = [
    {
      num: days,
      label: 'days'
    },
    {
      num: hours,
      label: 'hours'
    },
    {
      num: minutes,
      label: 'minutes'
    },
    {
      num: seconds,
      label: 'seconds'
    }
  ]

  onMount(() => new Clock('May 23, 2024 12:00:00'));
</script>

<style>
  .countdown span {
    display: inline-block;
    min-width: 2ch;
    text-align: center;
  }
</style>

<div class={cn("sticky left-0 top-0 z-[1] flex flex-col md:flex-row w-full items-center justify-center gap-2 p-2", hidden ? "hidden" : "")}>
  <h2>Virtual Fair starts in:</h2>
  <div class="flex items-center gap-2">
    {#each list as { label, num } (label)}
      <div class="flex items-baseline gap-1">
        <p class="text-2xl">{num}</p>
        <span class="text-xs">{label}</span>
      </div>
    {/each} 
  </div>
</div>
