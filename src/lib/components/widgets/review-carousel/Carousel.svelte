<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import EmblaCarousel, { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import {
		addPrevNextBtnsClickHandlers,
		addNavBtnListeners,
		addPlayBtnListeners
	} from '$lib/common/embla';
	import Card from '$lib/components/ui/card/card.svelte'; 
	import { buttonVariants } from '$lib/components/ui/button';
	import Rating from '../Rating.svelte';
	import type { iReview } from '$lib/interfaces';

	import "./css/base.css"
	import "./css/embla.css"

	let className: string = '';
	export { className as class };
	export let reviews: iReview[] = []

	let emblaNode: HTMLElement;
	let prevBtn: HTMLButtonElement;
	let nextBtn: HTMLButtonElement;
	let playBtn: HTMLButtonElement;
	let slideViewport: HTMLElement;
	let emblaApi: EmblaCarouselType;

	const OPTIONS: EmblaOptionsType = {
		// loop: true
	};
	onMount(() => {
		const viewportNodeMainCarousel = <HTMLElement>slideViewport;

		emblaApi = EmblaCarousel(viewportNodeMainCarousel, OPTIONS, [
			Autoplay({ playOnInit: false, delay: 6000 })
		]);

		const removePrevNextBtnClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);
		const removePlayBtnListeners = addPlayBtnListeners(emblaApi, playBtn);
		const removeNavBtnListeners = addNavBtnListeners(emblaApi, prevBtn, nextBtn);

		return () => {
			emblaApi
				.on('destroy', removePrevNextBtnClickHandlers)
				.on('destroy', removePlayBtnListeners)
				.on('destroy', removeNavBtnListeners);
		};
	});
</script>

<div bind:this={emblaNode} class={cn('embla', className)}>
	<div bind:this={slideViewport} class="embla__viewport">
		<div class="embla__container !auto-cols-[95%] md:!auto-cols-[40%]">
			{#each reviews as { image, name, review }, i}
				<Card
					class="embla__slide flex flex-shrink-0 flex-grow-0 basis-[95%] flex-col items-center justify-center gap-6 bg-white p-4 dark:bg-primary/10 md:basis-[40%] dark:border-none"
				>
					<div class="flex flex-col items-center gap-2">
						<img loading="lazy" src={image} alt={name} class="h-16 w-16 rounded-full" />
						<h2>
							{name}
						</h2>
						<Rating />
					</div>
					<p class="h-[200px] overflow-auto px-4 md:px-6">
						{@html review}
					</p>
				</Card>
			{/each}
		</div>
	</div>
	<div class="embla__controls">
		<div class="embla__buttons">
			<button
				aria-label="previous button"
				bind:this={prevBtn}
				class={cn(
					'embla__button embla__button--prev',
					buttonVariants({ variant: 'outline' }),
					'!rounded-full !bg-white shadow-custom dark:!bg-primary/10'
				)}
				type="button"
			>
				<svg class="embla__button__svg" viewBox="0 0 532 532">
					<path
						fill="currentColor"
						d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
					></path>
				</svg>
			</button>
			<button
				aria-label="next button"
				bind:this={nextBtn}
				class={cn(
					'embla__button embla__button--next',
					buttonVariants({ variant: 'outline' }),
					'!rounded-full !bg-white shadow-custom dark:!bg-primary/10'
				)}
				type="button"
			>
				<svg class="embla__button__svg" viewBox="0 0 532 532">
					<path
						fill="currentColor"
						d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
					></path>
				</svg>
			</button>
		</div>
		<button
			aria-label="play button"
			bind:this={playBtn}
			class={cn(
				'embla__play',
				buttonVariants({ variant: 'outline' }),
				'!rounded-full !bg-white shadow-custom dark:!bg-primary/10'
			)}
			type="button">Start</button
		>
	</div>
</div>
