<script lang="ts">
	import { utils, Collection, type iHeroLoad, getDescription, getOgImage, } from "$lib";
	import Partnercard from "$lib/components/cards/Partnercard.svelte";
	import Hero from "$lib/components/partials/Hero.svelte";
	import SkeletonPartnercard from "$lib/components/skeletons/SkeletonPartnercard.svelte";
	import type { PageLoad } from './$types';
	
	export let data: PageLoad;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	$: title = "Partners | DHUB Education"
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
  {#await utils.getList(Collection.PARTNERS)}
    {#each [1, 2, 3, 4] as _, i}
      <SkeletonPartnercard small={true} />
    {/each}
  {:then value}
    {#each value as partner, i}
      <Partnercard small={true} { partner } />
    {/each}
  {/await}
</div>