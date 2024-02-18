<script lang="ts">
	import { getDescription, getOgImage, type iPartner, type iPartnerLoad } from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import Partnercard from '$lib/components/cards/Partnercard.svelte';
	import SkeletonPartnercard from '$lib/components/skeletons/SkeletonPartnercard.svelte';
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	$: loaded = data as unknown as iPartnerLoad;

	$: partner = loaded.partner as iPartner;

	
	
	$: title = `${partner.name} | DHUB Education`
	$: description = getDescription(partner.name)
	$: ogimage = getOgImage(partner.landscapepic)
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
			{#await loaded.partners}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonPartnercard small={true} />
				{/each}
			{:then value}
				{#each value.filter(item => item.name !== partner.name) as item, i}
					<Partnercard partner={item} name={partner.name} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="title">{partner.name}</h1>
			<p>{partner.country}</p>
		</div>
		<img class="md:hidden w-full aspect-video" src={partner.landscapepic} alt={partner.name} />
		<div class="flex flex-col gap-4">
			<img
				class="rounded-lg aspect-video object-cover shadow-custom w-full hidden md:block"
				src={partner.landscapepic}
				alt={partner.name}
			/>
			<div class="flex flex-col gap-4">
				<svelte:component this={partner.content} />
			</div>
		</div>
		<Button
			options={{
				dataname: partner.name,
				isAnchorLink: true,
				href: partner.website,
				text: 'homepage',
				width: 'w-full md:w-fit self-center',
				padding: 'py-3 px-6'
			}}
		/>
	</main>
	<aside class="flex flex-col gap-4 md:hidden">
		<h2 class="opacity-50 uppercase">All Partners</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.partners}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonPartnercard small={true} />
				{/each}
			{:then value}
				{#each value as item, i}
					<Partnercard partner={item} small={true} />
				{/each}
			{/await}
		</div>
	</aside>
</div>
