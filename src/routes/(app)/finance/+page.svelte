<script lang="ts">
	import { getDescription, getOgImage, type iHeroLoad, type iSession } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from '../$types';
	import { Button } from '$lib/components/ui/button';
	
	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	const handleSubmit = (evt: SubmitEvent) => {
		
	};

	onMount(() => {
		// handling international phone input
	});

	$: title = "Finance | DHUB Education"
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

<div class="acenter p-4">
	<p
		class="mx-auto border-l-4 rounded-lg border-primary dark:border-white shadow-custom bg-white dark:bg-dark-800 p-4">
		With different challenges facing international students, such as paying tuition fees deposits or
		receiving allowances from Nigeria, you can rest assured that with our UK partner, your tuition
		fees can be paid within 2-3 hours. Our partner provide automated payment reminders to
		international students, ensuring they do not miss payment deadlines and avoid late payment
		penalties. This feature can also help reduce the administrative burden on the institution. We
		offer a 24/7 payment service.
	</p>
	<Button href="https://ideal4finance.com/business-lending">Learn more</Button>

</div>
