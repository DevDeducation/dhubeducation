<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Alerts, Classes, Constants, Events, getDescription, getOgImage, type iEmailPassword, type iHeroLoad, type iSession } from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import Hero from '$lib/components/partials/Hero.svelte';
	import { handleRegisterWithEmailAndPassword, navigateToDestination } from '$lib/firebase/client';
	import { alertstore, utilsstore } from '$lib/stores/utilsstore';
	import intlTelInput from 'intl-tel-input';
	import { onMount, onDestroy } from 'svelte';
	import type { ActionData } from './$types';
	import '../../../styles/intlTelInput.min.css';
	import { browser } from '$app/environment';
	import type { PageServerData } from '../$types';
	
	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	export let form: ActionData;

	let phoneInput: HTMLElement;
	let submitter: HTMLButtonElement;

	let countryName: string = 'Nigeria';
	let countryCode: string = '+234';
	let countryIsoCode: string = 'ng';
	let phoneInputIntl: intlTelInput.Plugin;

	$: {
		if (browser && form) {
			$utilsstore.setAlert(form.message, form.status, alertstore);
			submitter.classList.remove(Classes.LOADING);
		}
	}

	const handleCountryChange = (evt: Event) => {
		countryCode = `+${phoneInputIntl.getSelectedCountryData().dialCode}`;
		countryIsoCode = phoneInputIntl.getSelectedCountryData().iso2;
		countryName = phoneInputIntl.getSelectedCountryData().name;
	};

	const handleSubmit = (evt: SubmitEvent) => {
		submitter = evt.submitter as HTMLButtonElement;
		submitter.classList.add(Classes.LOADING);
	};

	onMount(() => {
		// handling international phone input
		phoneInputIntl = intlTelInput(phoneInput, {
			// utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
			utilsScript: '/utils.min.js',
			preferredCountries: ['uk'],
			separateDialCode: true,
			initialCountry: 'ng'
		});

		countryName = phoneInputIntl.getSelectedCountryData().name;

		phoneInput && phoneInput.addEventListener(Events.COUNTRYCHANGE, handleCountryChange);
	});

	onDestroy(() => {
		phoneInput && phoneInput.removeEventListener(Events.COUNTRYCHANGE, handleCountryChange);
	});

	$: title = "Finance | DHUB Education"
	$: description = getDescription(slider.subline)
	$: ogimage = getOgImage(slider.background)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}" />
	
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{ogimage}" />

  <!-- Twitter -->
  <meta property="twitter:title" content="{title}" />
  <meta property="twitter:description" content="{description}" />
  <meta property="twitter:image" content="{ogimage}" />
</svelte:head>

<Hero
options={{
	cta: false,
	title: slider.title,
	subline: [slider.subline],
	backgroundImage: slider.background
}}
/>

<div class="acenter p-4">
	<p
		class="max-w-lg mx-auto border-l-4 rounded-lg border-primary dark:border-white shadow-custom bg-white dark:bg-dark-800 p-4"
	>
		With different challenges facing international students, such as paying tuition fees deposits or
		receiving allowances from Nigeria, you can rest assured that with our UK partners, your tuition
		fees can be paid within 2-3 hours. Our partners provide automated payment reminders to
		international students, ensuring they do not miss payment deadlines and avoid late payment
		penalties. This feature can also help reduce the administrative burden on the institution. We
		offer a 24/7 payment service.
	</p>
	<div class="form hidden">
		<section class="py-4 acenter">
			<form
				id="finance"
				action="?/finance"
				class="mx-auto md:pb-4 md:max-w-lg bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg overflow-hidden flex flex-col p-4 gap-4 w-full text-center"
				enctype="multipart/form-data"
				use:enhance
				on:submit={handleSubmit}
				method="post"
			>
				<h1 class="sub-title uppercase">Submit details to apply</h1>
				<hr class="dark:opacity-30" />
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input
						type="text"
						name="name"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="name"
						required
						placeholder="Full name"
					/>
					<input
						type="text"
						name="email"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="email"
						required
						placeholder="Email address"
					/>
					<input
						type="tel"
						name="phoneNumber"
						bind:this={phoneInput}
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="phoneNumber"
						required
						placeholder="Phone Number"
					/>
					<input
						type="text"
						name="address"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="address"
						required
						placeholder="Home address"
					/>
					<select
						class="select select-bordered w-full bg-transparent dark:text-white"
						name="levelOfStudy"
						required
					>
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
						required
					>
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
						required
					>
						<option disabled selected>Country of Interest</option>
						<option class="dark:text-font" value="United States of America"
							>USA (For UK students)</option
						>
						<option class="dark:text-font" value="Malta">Malta</option>
						<option class="dark:text-font" value="France (Paris)">France (Paris)</option>
						<option class="dark:text-font" value="United Kingdom">United Kingdom</option>
						<option class="dark:text-font" value="Netherland">Netherland</option>
						<option class="dark:text-font" value="Canada">Canada</option>
					</select>
					<input
						type="text"
						name="loan"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="loanamount"
						required
						placeholder="Loan amount"
					/>
				</div>
				<Button
					options={{
						dataname: 'apply',
						isAnchorLink: false,
						btnType: 'submit',
						text: 'apply',
						otherclasses: 'self-center',
						padding: 'py-3 px-6'
					}}
				/>
			</form>
		</section>
	</div>
</div>
