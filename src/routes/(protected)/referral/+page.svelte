<script lang="ts">
	import Table from '$lib/components/widgets/Table.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import { alertstore, isloading, pagestore, utilsstore } from '$lib/stores/utilsstore';
	import { Classes, type iFBResponse, type iReferee } from '$lib';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Refereecard from '$lib/components/cards/Refereecard.svelte';

	$pagestore = "Referral"
	export let data: PageServerData

	let referees: iReferee[] = data.response.data as unknown as iReferee[] || []

	let parent: HTMLElement

	$: referees = referees

	const handleClick = (evt: Event) => {
		const target = evt.target as HTMLElement
		parent = target.parentElement as HTMLElement
		parent.classList.add(Classes.LOADING)
	}

	const handleDelete = async (evt: CustomEvent) => {
		evt.preventDefault()
		const email = evt.detail.email
	
		const res = await fetch("/api/referees", {
			method: "delete",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email})
		})
		const fbRes = await res.json() as iFBResponse

		$utilsstore.setAlert(fbRes.message, fbRes.status, alertstore)

		if (fbRes.status === "success") {
			referees = referees.filter(referee => referee.email !== email)
		}
	}
	onMount(() => $isloading = false)
</script>


<div class="flex flex-col gap-4">

	<Button options={{
		href: "/referral/add",
		text: "add referee",
		isAnchorLink: true,
	}} on:click={handleClick} />
	<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each referees as referee (referee.email)}
		<Refereecard { referee } on:delete={handleDelete} />
		{/each}
	</div>
	<!-- <Table { referees } on:delete={handleDelete} /> -->
</div>