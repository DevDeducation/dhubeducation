<script lang="ts">
	import { type iBlogLoad, type iBlog, getOgImage, getDescription } from '$lib';
	import Blogcard from '$lib/components/cards/Blogcard.svelte'; 
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	$: loaded = data as unknown as iBlogLoad;

	$: blog = loaded.blog as iBlog;
	$: blogs = loaded.blogs.filter(post => post.title !== blog.title);
	
	$: title = `${blog.title} | DHUB Education`
	$: description = getDescription(blog.caption)
	$: ogimage = getOgImage(blog.banner)
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

<div class="acenter grid grid-cols-1 md:grid-cols-[1fr_480px] gap-4">
	<main class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="title">{blog.title}</h1>
		</div>
		<img class="md:hidden w-full aspect-video" src={blog.banner} alt={blog.title} />
		<div class="flex flex-col gap-4">
			<img
				class="rounded-lg aspect-video max-w-xl object-cover shadow-custom w-full hidden md:block"
				src={blog.banner}
				alt={blog.title}
			/>
			<div class="flex flex-col gap-4 blog-content">
				<svelte:component this={blog.content} />
			</div>
		</div>
	</main>
	<aside class="flex-col gap-4 hidden md:flex">
		<h2 class="opacity-50 uppercase">All Blogs</h2>
		<div class="grid grid-cols-1 gap-2">
			{#each blogs as item, i}
			<a href={`/blog/${item.slug}`} class="underline">{item.title}</a>
			{/each}
		</div>
	</aside>
	<aside class="flex flex-col gap-4 md:hidden">
		<h2 class="opacity-50 uppercase">All Blogs</h2>
		<div class="grid grid-cols-1 gap-2">
			{#each blogs as item (item.title)}
				<a href={`/blog/${item.slug}`} class="underline">{item.title}</a>
			{/each}
		</div>
	</aside>
</div>

<style>
</style>