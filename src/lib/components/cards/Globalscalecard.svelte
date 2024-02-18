<script lang="ts">
	import type { iGlobalScale } from '$lib/interfaces';
	import { onMount } from 'svelte';

	export let options: iGlobalScale = {
		num: 0,
		text: ''
	};

	let valueDisplay: HTMLElement;
  let counter: any

	const initialize = () => {
		let interval = 1;
		let startValue = 0;
		let endValue = options.num;
		let duration = Math.floor(interval / endValue);
		counter = setInterval(() => {
			startValue += 1;
      if (valueDisplay) {
			  valueDisplay.textContent = startValue.toString();
      }
			if (startValue >= endValue) {
				clearInterval(counter);
			}
		}, duration);
	};

	onMount(initialize);
</script>

<div
	class="py-4 px-4 md:px-8 rounded-lg w-full text-xs border-primary text-center flex flex-col items-center gap-2 bg-pattern dark:bg-pattern-dark shadow-custom">
	<div class="text-2xl md:text-3xl font-bold" bind:this={valueDisplay}>0</div>
	<div
		class="text-xs uppercase font-extrabold bg-primary text-center text-white dark:bg-white dark:text-primary w-[124px] py-2 px-4 rounded-[50px]">
		{options.text}
	</div>
</div>
