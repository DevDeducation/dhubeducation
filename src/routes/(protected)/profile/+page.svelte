<script lang="ts"> 
	import { alertstore, isloading, pagestore, utilsstore } from '$lib/stores/utilsstore'; 
	import { Classes, educationlist, type TAlert, type iUser, referrallist, countrylist } from '$lib';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { page } from '$app/stores'; 
	import Payment from '$lib/components/fields/Payment.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Selectlist from '$lib/components/widgets/Selectlist.svelte';
	
	export let form: ActionData

	let button: HTMLElement

	let user: iUser = $page.data.registered

	$: user = user
	
	$pagestore = "Profile"

	$: {
		if (form) {
			button.classList.remove(Classes.LOADING)
			location.reload()
			const type = form?.status as TAlert
			const message = form?.message as string
			$utilsstore.setAlert(message, type, alertstore);
		}
	}

	const handleSubmit = (evt: SubmitEvent) => {
		button = evt.submitter as HTMLElement
		button.classList.add(Classes.LOADING)
	}

	onMount(() => $isloading = false) 
	
</script>

<form
action="/profile?/update"
class="max-w-2xl md:pb-4 shadow-custom rounded-lg flex flex-col gap-4 w-full text-center"
enctype="multipart/form-data"
use:enhance
on:submit={handleSubmit}
method="post">
<h1 class="sub-title">Profile Information</h1>
<div class="text-center">

	<input type="text" hidden name="countryName" bind:value={user.countryName} />
	<input type="text" hidden name="countryCode" bind:value={user.countryCode} />
	<input type="text" hidden name="countryIsoCode" bind:value={user.countryIsoCode} />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="grid grid-cols-1 gap-4">
			<Input
				type="text"
				name="name"
				class="!border !border-muted dark:bg-transparent"
				id="name"
				required
				bind:value={user.name}
				placeholder="Full name"
			/>
			<Input
				type="email"
				name="email"
				class="!border !border-muted dark:bg-transparent"
				id="email"
				hidden
				required
				bind:value={user.email}
				placeholder="Email address"
			/>
			<Input
				type="text"
				name="address"
				class="!border !border-muted dark:bg-transparent"
				id="address"
				required
				bind:value={user.address}
				placeholder="Home address"
			/>
			<Selectlist list={educationlist} name="levelOfStudy" label="Level of Study" />
			<Selectlist list={referrallist} name="typeOfReferral" label="Type of Referral" />
			<Selectlist list={countrylist} name="countryOfInterest" label="Country of Interest" />
			<Input
				type="tel"
				name="phoneNumber"
				bind:value={user.phoneNumber}
				class="!border !border-muted dark:bg-transparent"
				id="phoneNumber"
				required
				placeholder="Phone Number"
			/>
		</div>
		<Payment method={user.paymentMethod} { user } />
	</div>
</div>
<Button type="submit" class="text-white md:w-fit mx-auto">Submit</Button>
</form>