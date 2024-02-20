<script lang="ts"> 
	import { Classes, Events, educationlist, type TAlert, referrallist, countrylist, currencylist } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import '../../../../styles/intlTelInput.min.css';
	import intlTelInput from 'intl-tel-input';
	import type { ActionData } from './$types';
	import { utilsstore, alertstore, pagestore } from '$lib/stores/utilsstore';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Selectlist from '$lib/components/widgets/Selectlist.svelte';

	export let form: ActionData

	let phoneInput: HTMLElement;
	let button: HTMLElement

	let countryName: string = 'Nigeria';
	let countryCode: string = '+234';
	let countryIsoCode: string = 'ng';
	let phoneInputIntl: intlTelInput.Plugin;
	
	$pagestore = "Add Referee"

	const handleCountryChange = () => {
		countryIsoCode = phoneInputIntl.getSelectedCountryData().iso2
		countryCode = `+${phoneInputIntl.getSelectedCountryData().dialCode}`;
		countryName = phoneInputIntl.getSelectedCountryData().name;
	};


	onMount(() => {
		// handling international phone input
		phoneInputIntl = intlTelInput(phoneInput, {
			// utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
      utilsScript: '/utils.min.js',
			preferredCountries: ['uk'],
			separateDialCode: true,
			initialCountry: "ng"
		});

		countryName = phoneInputIntl.getSelectedCountryData().name;

		phoneInput && phoneInput.addEventListener(Events.COUNTRYCHANGE, handleCountryChange);
	});

	onDestroy(() => {
		phoneInput && phoneInput.removeEventListener(Events.COUNTRYCHANGE, handleCountryChange);
	});

	$: {
		if (form) {
			button.classList.remove(Classes.LOADING)
			const type = form?.status as TAlert
			const message = form?.message as string
			$utilsstore.setAlert(message, type, alertstore);
			type === "success" && goto('/referral')
		}
	}

	const handleSubmit = (evt: SubmitEvent) => {
		button = evt.submitter as HTMLElement
		button.classList.add(Classes.LOADING)
	}
</script>

<form
	id="add"
	action="/referral/add?/add"
	class="max-w-lg md:pb-4 rounded-lg flex flex-col gap-4 w-full text-center"
	enctype="multipart/form-data"
	use:enhance
	on:submit={handleSubmit}
	method="post">
	<p class="text-left">Enter the details of the students you want to refer</p>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

		<input type="text" hidden name="countryName" bind:value={countryName} />
		<input type="text" hidden name="countryCode" bind:value={countryCode} />
		<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />
		<Input
			type="text"
			name="name"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Student's full name"
		/>
		<Input
			type="email"
			name="email"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Student's email address"
		/>
		<Input
			type="text"
			name="address"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Student's home address"
		/>
		<Input
			type="text"
			name="nameOfSchool"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Name of the school"
		/>
		<Input
			type="text"
			name="yearOfStudy"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Year of study"
		/>
		<Selectlist list={educationlist} name="levelOfStudy" label="Level of Study" />
		<Selectlist list={referrallist} name="typeOfReferral" label="Type of Referral" />
		<Selectlist list={countrylist} name="countryOfInterest" label="Country of Interest" />
	</div>
	<input
		type="tel"
		name="phoneNumber"
		bind:this={phoneInput}
		class="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !border !border-muted dark:bg-transparent"
		id="phoneNumber"
		required
		placeholder="Phone Number"
	/>
	<div class="flex flex-col md:flex-row items-center gap-4">
		
		<Selectlist list={currencylist} name="currency" label="Currency" />
		<Input
			type="number"
			name="tuition"
			class="!border !border-muted dark:bg-transparent"
			required
			placeholder="Tuition"
		/>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		
		<Button type="submit" class="text-white">Add</Button>
		<Button type="button" on:click={$utilsstore.handleBack} variant="outline" class="dark:text-white text-primary bg-transparent">Back</Button>
	</div>
</form>
