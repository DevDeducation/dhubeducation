<script lang="ts">
	import { sectors, type iHeroLoad, getDescription, getOgImage } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';
	import Sector from '$lib/components/partials/Sector.svelte';
	import type { PageLoad } from '../$types';
	export let data: PageLoad;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	$: title = "About Us | DHUB Education"
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

<section>
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-4 acenter">
		{#each sectors as sector, i}
			<Sector {sector} />
		{/each}
	</div>
</section>
