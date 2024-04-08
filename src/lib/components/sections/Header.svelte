<script lang="ts">
	import Hamburger from './../buttons/Hamburger.svelte';
	import Avatar from '../buttons/Avatar.svelte';
	import { pagestore } from '$lib/stores/utilsstore';

	import { Button } from '../ui/button';
	import Darkmode from '../buttons/Darkmode.svelte';
	import Logo from '../icons/Logo.svelte';

	export let classes: string = '';
	export let center: boolean = true;
	export let showLogo: boolean = true;
	export let showTitle: boolean = false;
	export let openRoute: boolean = true;

	const innerDivClass = center
		? 'acenter flex justify-between items-center h-[72px]'
		: 'flex justify-between items-center h-[72px]';

	let className = 'sticky left-0 top-0 z-[32] w-full nav dark:bg-dark-800 bg-white shadow-custom';
	className = classes.length > 0 ? `${className} ${classes}` : className;
</script>

<section class={className}>
	<div class={innerDivClass}>
		{#if showLogo}
			<Logo />
		{/if}

		{#if showTitle}
			<!-- <Searchbar /> -->
			<h1 class="capitalise hidden md:block">{$pagestore}</h1>
		{/if}

		<!-- <NewLogo /> -->
		<div class="right flex gap-4 items-center">
			<nav class="hidden md:flex items-center gap-6 justify-center capitalise text-sm dark:text-white">
				{#if openRoute}
					<a
						aria-label="home"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/">Home</a
					>
					<a
						aria-label="services"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/services">Services</a
					>
					<a
						aria-label="course"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/courses">Courses</a
					>
					<a
						aria-label="affiliate"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/affiliate-program">Affiliate</a
					>
					<a
						aria-label="partners"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/partners">Partners</a
					>
					<a
						aria-label="affiliate"
						class="font-medium opacity-80 hover:opacity-100 active:opacity-100"
						href="/finance">Finance</a
					>
				{/if}
				<!-- <Button class="text-white">
					<a href="/enquiry">Enquiry</a>	
				</Button> -->
			</nav>
			<div>
				<div class="flex items-center gap-2">
					<Darkmode />
					<Avatar />
					<Hamburger />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.nav {
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
	}
</style>
