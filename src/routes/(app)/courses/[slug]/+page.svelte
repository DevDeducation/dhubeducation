<script lang="ts">
	import type { iCourse } from '$lib';
	import type { iCourseLoad } from '$lib/interfaces/index.ts';
	import { getDescription, getOgImage, type iService, type iServiceLoad } from '$lib';
	import Servicecard from '$lib/components/cards/Servicecard.svelte';
	import SkeletonServicecard from '$lib/components/skeletons/SkeletonServicecard.svelte'; 
	import type { PageLoad } from './$types';
	import { Button } from '$lib/components/ui/button';

	export let data: PageLoad;

	$: loaded = data as unknown as iCourseLoad;
	$: course = loaded.course as iCourse;
	
	$: title = `${course.name} | DHUB Education`
	$: description = getDescription(course.caption)
	$: ogimage = getOgImage(course.banner)
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

<div class="acenter grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="title">{course.name}</h1>
			<p>{course.caption}</p>
		</div>
		<img class="md:hidden w-full aspect-video" src={course.banner} alt={course.name} />
		<div class="flex flex-col gap-4">
			<img
				class="rounded-lg aspect-video object-cover shadow-custom w-full hidden md:block"
				src={course.banner}
				alt={course.name}
			/>
			<div class="flex flex-col gap-4">
				<svelte:component this={course.content} />
			</div>
		</div>
	</main>
	<aside class="flex-col gap-4 hidden md:flex">
		<a href="/courses" class="w-full">
			<Button class="text-white w-full">
				Register Now
			</Button>
		</a>
		<h2 class="opacity-50 uppercase">All Services</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.courses}
				{#each [1, 2, 3] as _, i}
					<SkeletonServicecard small={true} />
				{/each}
			{:then value}
				{#each value as item, i}
				<a href={`/courses/${course.slug}`}>{item.name}</a>
				{/each}
			{/await}
		</div>
	</aside>
	<aside class="flex flex-col gap-4 md:hidden">
		<a href="/courses" class="w-full">
			<Button class="text-white w-full">
				Register Now
			</Button>
		</a>
		<h2 class="opacity-50 uppercase">All Affiliates</h2>
		<div class="grid grid-cols-1 gap-2">
			{#await loaded.courses}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonServicecard small={true} />
				{/each}
			{:then value}
				{#each value as item, i}
				<a href={`/courses/${course.slug}`}>{item.name}</a>
				{/each}
			{/await}
		</div>
	</aside>
</div>
