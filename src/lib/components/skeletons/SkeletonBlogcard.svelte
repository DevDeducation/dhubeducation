<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import Arrowlink from '../partials/Arrowlink.svelte';
	import ImagePlaceholder from './ImagePlaceholder.svelte';

	export let small: boolean = false;
	
</script>

{#if !small}
	<div
		aria-label="skeleton"
		class="flex flex-col items-center rounded-lg overflow-hidden gap-4 p-4 shadow-custom bg-white dark:bg-dark-800 text-center border-primary border-t-4 w-full">
		<ImagePlaceholder classes="w-[128px] h-[128px] rounded-full p-4" />
		<div class="flex flex-col justify-center items-center gap-1">
			<h2 class="two-lines sub-title h-[28px] w-3/4 preloader rounded-md text-transparent dark:text-transparent bg-gray-200 dark:bg-dark-700">title</h2>
			<p class="two-lines h-[48px] w-full preloader rounded-md text-transparent bg-gray-200 dark:bg-dark-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit velit cumque possimus. Libero omnis sunt molestiae eos deleniti animi, eum fuga est inventore facilis. Blanditiis corporis voluptatibus cumque at ea.</p>
		</div>
		<div class="flex items-center flex-col md:flex-row w-full justify-center gap-2">
			<div class="h-[48px] preloader rounded-md w-full md:w-1/3 text-transparent bg-gray-200 dark:bg-dark-700">button</div>
			<div class="h-[48px] preloader rounded-md w-full md:w-1/3 text-transparent bg-gray-200 dark:bg-dark-700">button</div>
		</div>
	</div>
{/if}

{#if small}
	<a
		href="#"
		aria-label="skeleton"
		class="flex flex-col items-center p-4 rounded-lg overflow-hidden shadow-custom bg-white dark:bg-dark-800 gap-2 w-full">
		<div class="grid grid-cols-[1fr_2fr] gap-2">
			<ImagePlaceholder square={true} />
			<div class="w-full h-full overflow-hidden text-ellipsis flex flex-col justify-between p-2">
				<div class="flex flex-col justify-between h-full">
					<div class="flex flex-col gap-2">
						<h2 class="text-base font-semibold one-line overflow-hidden text-ellipsis h-[24px] w-1/2 preloader rounded-md text-transparent dark:text-transparent bg-gray-200 dark:bg-dark-700">title</h2>
        		<p class="two-lines dark:opacity-60 w-full text-xs h-[32px] preloader rounded-md text-transparent bg-gray-200 dark:bg-dark-700">body</p>
					</div>
					<div class="rounded-[50px] py-1 px-2 uppercase live text-2xs font-semibold w-[62px] h-[24px] preloader rounded-md text-transparent bg-gray-200 dark:bg-dark-700">details</div>
				</div>
			</div>
		</div> 
		<div aria-label="details" class="flex flex-col gap-2 h-[32px] w-1/2 preloader rounded-md text-transparent bg-gray-200 dark:bg-dark-700">viewing</div>
	</a>
{/if}
