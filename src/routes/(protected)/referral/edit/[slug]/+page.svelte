<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Classes, Events, type TAlert, type iReferee } from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import { alertstore, pagestore, utilsstore } from '$lib/stores/utilsstore';
	import type { ActionData, PageServerData } from './$types';
	import { browser } from '$app/environment';
	import '../../../../../styles/intlTelInput.min.css';
	import intlTelInput from 'intl-tel-input';
	import { onDestroy, onMount } from 'svelte';

	export let data: PageServerData;

	export let form: ActionData

	let referee: iReferee = data.data

	let phoneInput: HTMLElement;
	let button: HTMLElement

	let countryName: string = referee.countryName;
	let countryCode: string = referee.countryCode;
	let countryIsoCode: string = referee.countryIsoCode
	let phoneInputIntl: intlTelInput.Plugin

	$pagestore = "Edit Referee"

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
			initialCountry: referee.countryIsoCode
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

	$: {
		if (data.status === "success") {
			referee = data.data
		} else {
			$utilsstore.setAlert(data.message, "error", alertstore)
		}
	}

	$: url = browser ? new URL(location.href).pathname : ""

	const handleSubmit = (evt: SubmitEvent) => {
		button = evt.submitter as HTMLElement
		button.classList.add(Classes.LOADING)
	}



</script>

{#if referee}
<form
id="add"
action={`${url}?/edit`}
class="max-w-lg md:pb-4 bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg flex flex-col p-4 gap-4 w-full text-center"
enctype="multipart/form-data"
use:enhance
on:submit={handleSubmit}
method="post">
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
	<input type="text" hidden name="countryName" bind:value={countryName} />
	<input type="text" hidden name="countryCode" bind:value={countryCode} />
	<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />
	<input
		type="text"
		name="name"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={referee.name}
		placeholder="Student's full name"
	/>
	<input
		type="email"
		name="email"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={referee.email}
		placeholder="Student's email address"
	/>
	<input
		type="text"
		name="address"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={referee.address}
		placeholder="Student's home address"
	/>
	<input
		type="text"
		name="nameOfSchool"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={referee.nameOfSchool}
		placeholder="Name of the school"
	/>
	<input
		type="text"
		name="yearOfStudy"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={referee.yearOfStudy}
		placeholder="Year of study"
	/>
	<select
		class="select select-bordered w-full bg-transparent dark:text-white"
		name="levelOfStudy"
		bind:value={referee.levelOfStudy}
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
		bind:value={referee.typeOfReferral}
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
		bind:value={referee.countryOfInterest}
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
</div>
<input
	type="tel"
	name="phoneNumber"
	bind:this={phoneInput}
	bind:value={referee.phoneNumber}
	class="input input-bordered w-full bg-transparent dark:text-white"
	id="phoneNumber"
	required
	placeholder="Phone Number"
/>
<div class="flex flex-col md:flex-row items-center gap-2">
	<select
	class="select select-bordered w-full bg-transparent dark:text-white"
	name="currency"
	bind:value={referee.currency}
	required>
		<option disabled selected>Currency</option>
		<option class="dark:text-font" value="USD ($)">USD ($)</option>
		<option class="dark:text-font" value="GBP (£)">GBP (£)</option>
		<option class="dark:text-font" value="NGN (₦)">NGN (₦)</option> 
	</select>
	<input
		type="number"
		name="tuition"
		bind:value={referee.tuition}
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		placeholder="Tuition"
	/>
</div>
	<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
		<Button
			options={{
				dataname: 'add referee btn',
				isAnchorLink: false,
				btnType: 'submit',
				text: 'update',
				width: 'w-full md:w-fit self-center',
				padding: 'py-3 px-6'
			}}
		/>	
		<button
			on:click={$utilsstore.handleBack}
			class='bg-transparent border-2 border-primary dark:border-white  h-[48px] py-3 px-6 w-full self-center rounded-lg uppercase text-primary dark:text-white font-semibold relative flex items-center justify-center gap-2 md:w-fit'
			type="button">
			<span class="clickable"></span>
			<span class="spin-loader"></span>
			<span class="txt">back</span>
		</button> 
	</div>
</form>
{/if}
