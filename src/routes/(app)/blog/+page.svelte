<script lang="ts">
	import { Collection, getDescription, getOgImage, utils, type iBlog, type iHeroLoad } from "$lib";
	import Hero from "$lib/components/partials/Hero.svelte";
	import { onMount } from "svelte";
	import Blogcard from "$lib/components/cards/Blogcard.svelte";
	import SkeletonBlogcard from "$lib/components/skeletons/SkeletonBlogcard.svelte";
	import type { PageLoad } from '../$types';
	
	export let data: PageLoad;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;


	$: title = "Blog | DHUB Education"
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
<div class="card-grid-3 acenter">
  {#await utils.getList(Collection.BLOG)}
    {#each [1, 2, 3] as _, i}
      <SkeletonBlogcard small={true} />
    {/each}
  {:then value}
    {#each value as blog, i}
      <Blogcard { blog } small={true} title="read post" />
    {/each}
  {/await}
</div>