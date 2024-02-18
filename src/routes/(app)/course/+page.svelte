<script lang="ts">
	import { Constants, getDescription, getOgImage, utils } from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import { browser } from '$app/environment';
	import Courseform from '$lib/components/forms/Courseform.svelte';

	
	$: title = "Course | DHUB Education"
	$: description = getDescription('Travel Agent Operations and Management Course')
	$: ogimage = getOgImage('/images/course-banner.webp')
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


<section class="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 acenter">
	<img src="/images/course-banner.webp" class="w-full rounded-lg" alt="course banner"/>
	<Courseform />
</section>
