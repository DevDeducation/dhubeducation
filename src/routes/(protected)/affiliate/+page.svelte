<script lang="ts">
	import { Attributes, Constants, type iDashboard } from '$lib';
	import Copy from '$lib/components/icons/Copy.svelte';
	import { pagestore, isloading, utilsstore } from '$lib/stores/utilsstore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Dashboardcard from '$lib/components/cards/Dashboardcard.svelte';


	export let data: PageServerData
	let status: HTMLElement
	let toCopy: HTMLElement
	let copied: boolean = false
	const code = $utilsstore.encodeString($page.data.userSession.email)
	$: url = `https://dhubeducation.com/affiliate/?referer=${code}`

	$pagestore = 'Dashboard';

	const handleClick = async (evt: Event) => {
		const text = toCopy.getAttribute(Attributes.DATALINK) as string
		try {
			await navigator.clipboard.writeText(text)
			status.textContent = "copied!"
			copied = true
		} catch (error: any) {
			copied = false
			status.textContent = "copy error :("
		}

		setTimeout(() => {
			copied = false
			status.textContent = "copy"
		}, 1000);
	}

	$: copied = copied

	onMount(() => ($isloading = false));

	let dashboardList: iDashboard[] = [
		{
			url: '/referral', color: 'blue', kpi: data.added.toString(), name: "added", cta: 'details', iconclasses: "fill-blue-600 dark:fill-white",
			legend: 'Added students'
		},
		{
			url: '/referral', color: 'orange', kpi: data.confirmed.toString(), name: "confirmed", cta: 'details', iconclasses: "fill-transparent stroke-orange-600 dark:stroke-white w-6 h-6", legend: 'Confirmed students'
		},
		{
			url: '/referral', color: 'secondary', kpi: data.paid.toString(), name: 'paid', cta: 'details', iconclasses: "fill-primary dark:fill-white",
			legend: 'Students who have paid'
		},
		{
			url: '/referral', color: 'green', kpi: (Number(data.paid) * Number(Constants.UNITPAYOUT)).toString(), name: 'payout', cta: 'details', iconclasses: "fill-green-800 dark:fill-white", legend: 'Amount earned'
		}
	]
</script>

<div class="flex flex-col gap-4">
	<!-- <div
		class="flex flex-col items-center gap-2 lg:flex-row justify-between p-4 shadow-custom rounded-lg bg-white dark:bg-dark-800">
		<div class="flex flex-col lg:flex-row gap-2 items-center">
			<p class="opacity-50">Referral link</p>
			<p data-link={url} bind:this={toCopy} class="tocopy p-2 border-dashed border rounded-lg one-line w-full md:w-fit hidden md:block">{url}</p>
			<p data-link={url} bind:this={toCopy} class="tocopy p-2 border-dashed border rounded-lg one-line w-[114px] md:w-fit block md:hidden">...{code}</p>
		</div>
		<button class="relative flex items-center gap-2 uppercase py-2 px-4 text-sm font-semibold bt bt-primary rounded-lg text-white w-[114px]" on:click={handleClick}>
			<span class="clickable"></span>
			<span class="spin-loader"></span>
			<span class="txt w-fit" bind:this={status}>copy</span>
			<Copy {copied}/>
		</button>
	</div> -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
		
		{#each dashboardList as dashboard, i}
			<Dashboardcard { dashboard } />
		{/each}		
	</div>
</div>
