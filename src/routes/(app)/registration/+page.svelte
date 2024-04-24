<script lang="ts">
	import { Constants, getDescription, getOgImage, utils, type iHeroLoad, Collection } from '$lib';
	import Coursecard from '$lib/components/cards/Coursecard.svelte';
	import Courseform from '$lib/components/forms/Courseform.svelte';
	import RegistrationForm from '$lib/components/forms/RegistrationForm.svelte';
	import Hero from '$lib/components/partials/Hero.svelte'; 
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	$: title = 'Course | DHUB Education';
	$: description = getDescription('Travel Agent Operations and Management Course');
	$: ogimage = getOgImage('https://assets.tina.io/c33a0372-b234-4d33-889c-554ce83b13ff/popup/virtual-fair_2.webp');
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

<div class="acenter">
	<RegistrationForm />
</div>