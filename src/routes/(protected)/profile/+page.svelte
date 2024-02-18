<script lang="ts"> 
	import { alertstore, isloading, pagestore, utilsstore } from '$lib/stores/utilsstore'; 
	import { Classes, type TAlert, type iUser } from '$lib';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import Payment from '$lib/components/fields/Payment.svelte';
	import { invalidateAll } from '$app/navigation';
	
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
class="max-w-lg md:pb-4 bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg flex flex-col p-4 gap-4 w-full text-center"
enctype="multipart/form-data"
use:enhance
on:submit={handleSubmit}
method="post">
<h1 class="sub-title">Profile Information</h1>
<div class="flex flex-col gap-4">

	<input type="text" hidden name="countryName" bind:value={user.countryName} />
	<input type="text" hidden name="countryCode" bind:value={user.countryCode} />
	<input type="text" hidden name="countryIsoCode" bind:value={user.countryIsoCode} />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<input
			type="text"
			name="name"
			class="input input-bordered w-full bg-transparent dark:text-white"
			id="name"
			required
			bind:value={user.name}
			placeholder="Full name"
		/>
		<input
			type="email"
			name="email"
			class="input input-bordered w-full bg-transparent dark:text-white"
			id="email"
			hidden
			required
			bind:value={user.email}
			placeholder="Email address"
		/>
		<input
			type="text"
			name="address"
			class="input input-bordered w-full bg-transparent dark:text-white"
			id="address"
			required
			bind:value={user.address}
			placeholder="Home address"
		/>
		<select
			class="select select-bordered w-full bg-transparent dark:text-white"
			name="levelOfStudy"
			bind:value={user.levelOfStudy}
			required>
			<option disabled selected>Level of Study</option>
			<option class="dark:text-font" value="A-Level">A-Level</option>
			<option class="dark:text-font" value="Foundation">Foundation</option>
			<option class="dark:text-font" value="OND">OND</option>
			<option class="dark:text-font" value="HND">HND</option>
			<option class="dark:text-font" value="Top Up">Top Up</option>
			<option class="dark:text-font" value="BSc.">BSc.</option>
			<option class="dark:text-font" value="Pre-MSc.">Pre-MSc.</option>
			<option class="dark:text-font" value="MSc.">MSc.</option>
			<option class="dark:text-font" value="PhD.">PhD.</option>
		</select>
		<select
			class="select select-bordered w-full bg-transparent dark:text-white"
			name="typeOfReferral"
			bind:value={user.typeOfReferral}
			required>
			<option disabled selected>Type of Referral</option>
			<option class="dark:text-font" value="Customer">Customer</option>
			<option class="dark:text-font" value="Employee">Employee</option>
			<option class="dark:text-font" value="Influencer">Influencer</option>
			<option class="dark:text-font" value="Teacher">Teacher</option>
			<option class="dark:text-font" value="Vendor">Vendor</option>
		</select>

		<select
			class="select select-bordered w-full bg-transparent dark:text-white"
			name="countryOfInterest"
			bind:value={user.countryOfInterest}
			required>
			<option disabled selected>Country of Interest</option>
			<option class="dark:text-font" value="United States of America"
				>USA (For UK students)</option>
			<option class="dark:text-font" value="Malta">Malta</option>
			<option class="dark:text-font" value="France (Paris)">France (Paris)</option>
			<option class="dark:text-font" value="United Kingdom">United Kingdom</option>
			<option class="dark:text-font" value="Netherland">Netherland</option>
			<option class="dark:text-font" value="Canada">Canada</option>
		</select>
		<input
			type="tel"
			name="phoneNumber"
			bind:value={user.phoneNumber}
			class="input input-bordered w-full bg-transparent dark:text-white"
			id="phoneNumber"
			required
			placeholder="Phone Number"
		/>
	</div>
	<Payment method={user.paymentMethod} { user } />
</div>
<Button
	options={{
		dataname: 'update profile btn',
		isAnchorLink: false,
		btnType: 'submit',
		text: 'update',
		width: 'w-full md:w-fit self-center',
		padding: 'py-3 px-6'
	}}
/>
</form>