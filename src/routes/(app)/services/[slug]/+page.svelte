<script lang="ts">
	import { getDescription, getOgImage, type iService, type iServiceLoad } from '$lib';
	import Servicecard from '$lib/components/cards/Servicecard.svelte';
	import SkeletonServicecard from '$lib/components/skeletons/SkeletonServicecard.svelte'; 
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	$: loaded = data as unknown as iServiceLoad;
	$: service = loaded.service as iService;
	
	$: title = `${service.name} | DHUB Education`
	$: description = getDescription(service.description)
	$: ogimage = getOgImage(service.landscapepic)
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
		<h2 class="opacity-50 uppercase">All Services</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.services}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonServicecard small={true} />
				{/each}
			{:then value}
				{#each value as item, i}
					<Servicecard service={item} name={service.name} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="title">{service.name}</h1>
			<p>{service.description}</p>
		</div>
		<img class="md:hidden w-full aspect-video" src={service.landscapepic} alt={service.name} />
		<div class="flex flex-col gap-4">
			<img
				class="rounded-lg aspect-video object-cover shadow-custom w-full hidden md:block"
				src={service.landscapepic}
				alt={service.name}
			/>
			<div class="flex flex-col gap-4">
				<svelte:component this={service.content} />
			</div>
		</div>
	</main>
	<aside class="flex flex-col gap-4 md:hidden">
		<h2 class="opacity-50 uppercase">All Affiliates</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.services}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonServicecard small={true} />
				{/each}
			{:then value}
				{#each value as item, i}
					<Servicecard service={item} name={service.name} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
</div>
