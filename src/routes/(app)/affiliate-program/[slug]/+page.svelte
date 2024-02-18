<script lang="ts">
	import { getDescription, getOgImage, type iAffiliate, type iAffiliateLoad } from '$lib';
	import Affiliatecard from '$lib/components/cards/Affiliatecard.svelte';
	import SkeletonAffiliatecard from '$lib/components/skeletons/SkeletonAffiliatecard.svelte'; 
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	$: loaded = data as unknown as iAffiliateLoad;

	$: affiliate = loaded.affiliate as iAffiliate;
	
	$: title = `${affiliate.type} Affiliate | DHUB Education`
	$: description = getDescription(affiliate.caption)
	$: ogimage = getOgImage(affiliate.landscapepic)
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

<div class="acenter grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
	<aside class="flex-col gap-4 hidden md:flex">
		<h2 class="opacity-50 uppercase">All Affiliates</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.affiliates}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonAffiliatecard small={true} />
				{/each}
			{:then value}
				{#each value.filter(item => item.type !== affiliate.type) as item, i}
					<Affiliatecard type={affiliate.type} affiliate={item} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="title">{affiliate.type}</h1>
			<p>{affiliate.caption}</p>
		</div>
		<img class="md:hidden w-full aspect-video" src={affiliate.landscapepic} alt={affiliate.type} />
		<div class="flex flex-col gap-4">
			<img
				class="rounded-lg aspect-video object-cover shadow-custom w-full hidden md:block"
				src={affiliate.landscapepic}
				alt={affiliate.type}
			/>
			<div class="flex flex-col gap-4">
				<svelte:component this={affiliate.content} />
			</div>
		</div>
	</main>
	<aside class="flex flex-col gap-4 md:hidden">
		<h2 class="opacity-50 uppercase">All Affiliates</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.affiliates}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonAffiliatecard small={true} />
				{/each}
			{:then value}
				{#each value.filter(item => item.type !== affiliate.type) as item, i}
					<Affiliatecard type={affiliate.type} affiliate={item} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
</div>
