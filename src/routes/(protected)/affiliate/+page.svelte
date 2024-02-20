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
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
		
		{#each dashboardList as dashboard, i}
			<Dashboardcard { dashboard } />
		{/each}		
	</div>
</div>
