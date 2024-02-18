<script lang="ts">
	import { utils, Collection, type iHeroLoad, getDescription, getOgImage } from "$lib";
	import Affiliatecard from "$lib/components/cards/Affiliatecard.svelte";
	import Hero from "$lib/components/partials/Hero.svelte";
	import SkeletonAffiliatecard from "$lib/components/skeletons/SkeletonAffiliatecard.svelte"; 
	import type { PageLoad } from '../$types';
	
	export let data: PageLoad;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	$: title = "Affiliate Program | DHUB Education"
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
  {#await utils.getList(Collection.AFFILIATES)}
    {#each [1, 2, 3, 4] as _, i}
      <SkeletonAffiliatecard />
    {/each}
  {:then value}
    {#each value as affiliate, i}
      <Affiliatecard { affiliate } />
    {/each}
  {/await}
</div>