<script lang="ts">
	import { imgparams, type TAffiliate, type iAffiliate } from '$lib';
	import Button from '../buttons/Button.svelte';
	import Arrowlink from '../partials/Arrowlink.svelte';
	import { page } from '$app/stores';

	export let affiliate: iAffiliate;
	export let type: string = '';
	export let small: boolean = false;

	const cardType = affiliate.type.toLowerCase() as TAffiliate;

	let className =
		'w-full md:w-fit bt py-3 text-primary border-primary dark:text-white text-sm dark:border-white border-2 bg-transparent text-center';

	const isSelected = cardType === type.toLowerCase()

	if (type) {
		className = isSelected ? `${className} live` : className;
	}

	const text = $page.data.userSession ? 'dashboard' : 'sign in'
</script>

{#if !small}
	<div
		aria-label={affiliate.type}
		class="flex flex-col items-center rounded-lg overflow-hidden gap-4 p-4 shadow-custom bg-white dark:bg-dark-800 text-center border-primary border-t-4">
			<img src={`${affiliate.squarepic}${imgparams}`} class="w-32 h-32 rounded-full" alt={affiliate.type}>
		<div class="flex flex-col gap-1">
			<h2 class="two-lines w-full sub-title">
				{affiliate.type}
			</h2>
			<p class="lg:min-h-[72px] text-cen">{affiliate.caption}</p>
		</div>
		<div class="flex items-center flex-col md:flex-row w-full justify-center gap-2">
			<Button
				options={{
					isAnchorLink: true,
					href: `/affiliate-program/${affiliate.slug}`,
					btnType: 'button',
					text: "details"
				}}
			/>
			<a href="/affiliate" rel="modulepreload" aria-label={text} class={className}>{text}</a>
		</div>
	</div>
{/if}

{#if small}
	<a
		href={`/affiliate-program/${affiliate.slug}`}
		aria-label={affiliate.type}
		class={"flex flex-col rounded-lg overflow-hidden shadow-custom bg-white dark:bg-dark-800 p-2 gap-2"}>
		<div class="grid grid-cols-[1fr_2fr] gap-2">
			<!-- <AffiliateIcon classes="w-16 h-16" type={cardType} /> -->
			<img src={`${affiliate.squarepic}${imgparams}`} class={"object-cover rounded-md"} alt={affiliate.type}>
			<div class="w-full h-full overflow-hidden text-ellipsis flex flex-col justify-between">
				<div class="flex flex-col justify-between h-full">
					<div>
						<h2 class="text-base font-semibold one-line w-full overflow-hidden text-ellipsis">
							{affiliate.type}
						</h2>
						<p class="two-lines dark:opacity-60 w-full">
							{affiliate.caption}
						</p>
					</div>
					{#if isSelected}
						 <div class="rounded-[50px] py-1 px-2 w-fit uppercase bg-primary text-white dark:bg-white dark:text-primary live text-2xs font-semibold">viewing</div>
					{/if}
				</div>
			</div>
		</div> 
		<div aria-label="details" class="flex flex-col gap-2">
			<hr class="dark:opacity-30" />
			<Arrowlink title="details" />
		</div>
	</a>
{/if}
