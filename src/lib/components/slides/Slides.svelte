<script lang="ts">
	import Reveal from 'reveal.js';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import Highlight from 'reveal.js/plugin/highlight/highlight';
	import Notes from 'reveal.js/plugin/notes/notes';
	import 'reveal.js/dist/reveal.css';
	// import "reveal.js/dist/theme/black.css"
	import '../../../styles/reveal-custom.css';
	import 'reveal.js/plugin/highlight/monokai.css';

	import { onDestroy, onMount } from 'svelte';
	import Presentation from './deck/Presentation.svelte';
	import type { iSlider } from '$lib/interfaces';

	let deck: Reveal.Api;

	export let sliders: iSlider[]

	onMount(() => {
		deck = new Reveal();

		deck.initialize({
			plugins: [Markdown, Highlight, Notes],
			autoAnimateEasing: 'ease',
			autoAnimateDuration: 0.2,
			autoAnimateUnmatched: true,
			hash: true,
			controls: true,
			progress: true,
			embedded: true,
			// @ts-ignore
			scrollActivationWidth: null,
			loop: true,
			autoSlide: 5000
		});
	});

	onDestroy(() => deck.destroy());
</script>

<div class="reveal">
	<div class="slides">
		<Presentation {sliders} />
	</div>
</div>

<style>
	.reveal {
		height: 400px !important;
	}

	@media screen and (max-width: 767px) {
		.reveal {
			height: 300px !important;
		}
	}

	.reveal .slides section * {
		font-size: 16px !important;
	}
</style>
