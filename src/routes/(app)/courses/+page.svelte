<script lang="ts">
	import { Constants, getDescription, getOgImage, utils, type iHeroLoad, Collection } from '$lib';
	import Coursecard from '$lib/components/cards/Coursecard.svelte';
	import Courseform from '$lib/components/forms/Courseform.svelte';
	import Hero from '$lib/components/partials/Hero.svelte';
	import SkeletonServicecard from '$lib/components/skeletons/SkeletonServicecard.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	$: title = 'Course | DHUB Education';
	$: description = getDescription('Travel Agent Operations and Management Course');
	$: ogimage = getOgImage('/images/course-banner.webp');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogimage} />

	<!-- Twitter -->
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogimage} />
</svelte:head>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>

{#await utils.getList(Collection.COURSES)}
  <div class="acenter flex flex-col gap-4">
    <div class="card-grid-3 text-center">
      {#each [1, 2, 3] as _, i}
        <SkeletonServicecard />
      {/each}
    </div>
  </div>
{:then courses}
<div class="acenter flex flex-col gap-4">
	<div class="card-grid-3 text-center">
    {#each courses as course, i}
      <Coursecard {course} />
    {/each}
	</div>
</div>
{/await}
