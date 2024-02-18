<script lang="ts">
	import { Collection, utils, type iHeroLoad, getOgImage, getDescription } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';
	import Servicecard from '$lib/components/cards/Servicecard.svelte';
	import SkeletonServicecard from '$lib/components/skeletons/SkeletonServicecard.svelte';
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;


	$: title = "Services | DHUB Education"
	$: description = getDescription(slider.subline)
	$: ogimage = getOgImage(slider.background)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}" />
	
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{ogimage}" />

  <!-- Twitter -->
  <meta property="twitter:title" content="{title}" />
  <meta property="twitter:description" content="{description}" />
  <meta property="twitter:image" content="{ogimage}" />
</svelte:head>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>
<div class="card-grid-3 acenter text-center">
	{#await utils.getList(Collection.SERVICES)}
		{#each [1, 2, 3, 4] as _, i}
			<SkeletonServicecard />
		{/each}
	{:then value}
		{#each value as service, i}
			<Servicecard {service} />
		{/each}
	{/await}
</div>
