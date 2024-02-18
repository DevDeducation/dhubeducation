<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import { page } from '$app/stores';
	import { Alerts, Classes, Constants, Events, Flags, type iEmailPassword, type iSession, type iUser } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import '../../../styles/intlTelInput.min.css';
	import intlTelInput from 'intl-tel-input';
	import {
		getRedirect,
		handleRegisterWithEmailAndPassword,
		navigateToDestination
	} from '$lib/firebase/client';
	import { alertstore, utilsstore } from '$lib/stores/utilsstore';
	import { browser } from '$app/environment';
	import Payment from '$lib/components/fields/Payment.svelte';

	let loginUrl = '/login';

	const session: iSession = $page.data.userSession;

	const user: iUser = {
  id: 1,
  address: "",
  authtype: "",
  countryCode: "",
  countryName: "",
  countryIsoCode: "",
  countryOfInterest: "",
  email: "",
  levelOfStudy: "",
  name: "",
  phoneNumber: "",
  role: "",
  typeOfReferral: "",
  referer: "",
  timestamp: "",
  confirmed: "",
  paid: "",
  actions: "",
  nameOfSchool: "",
  tuition: "",
  currency: "",
  yearOfStudy: "",
  paymentMethod: "",
  paypalEmail: "",
  bankName: "",
  accountName: "",
  accountNumber: "",
	sortCode: "",
	swiftCode: ""
}

	let phoneInput: HTMLElement;
	let googleRegistrationForm: HTMLFormElement

	let redirectSuffix: string = '';
	let referer: string = $utilsstore.encodeString(Constants.DHUBEDUCATION_GMAIL).toString();
	let countryName: string = 'Nigeria';
	let countryCode: string = '+234';
	let countryIsoCode: string = 'ng';
	let phoneInputIntl: intlTelInput.Plugin;
	
	let method: string = Constants.BANK

	$: {
		if (browser) {
			const { url, params } = $utilsstore.urlParams();
			getRedirect() && (loginUrl += params)
			const urlReferer = url.searchParams.get('referer');

			referer = urlReferer ? urlReferer : $utilsstore.encodeString(Constants.DHUBEDUCATION_GMAIL).toString();
			console.log("referer is", referer, "urlReferer is", urlReferer, "typeof urlReferer", typeof urlReferer)
		}
	}

	const handleCountryChange = (evt: Event) => {
		countryCode = `+${phoneInputIntl.getSelectedCountryData().dialCode}`;
		countryIsoCode = phoneInputIntl.getSelectedCountryData().iso2
		countryName = phoneInputIntl.getSelectedCountryData().name;
	};

	const handleEmailAndPasswordSubmit = async (evt: SubmitEvent) => {
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const records = Object.fromEntries(formData.entries()) as Record<string, any>
		console.log("records", records)
		const emailPassword: iEmailPassword = {
			email: records.email as string,
			password: records.password as string
		};
		delete records.password;
		delete records.redirect;

		records.confirmed = Flags.TRUE
		records.paid = Flags.FALSE

		const button = evt.submitter as HTMLElement;
		try {
			button.classList.add(Classes.LOADING);
			await handleRegisterWithEmailAndPassword(emailPassword);
			
			console.log("submitted records", records)
			// $utilsstore.setLs('referer', records.referer as string);
			await fetch('/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(records)
			});

			navigateToDestination();
			const message = 'Successfully registered';
			$utilsstore.setAlert(message, Alerts.SUCCESS, alertstore);
			button.classList.remove(Classes.LOADING);
		} catch (error: any) {
			button.classList.remove(Classes.LOADING);
			const message = $utilsstore.formatErrorMessage(error.message);
			$utilsstore.setAlert(message, Alerts.ERROR, alertstore);
		}
	};

	const handleGoogleSubmit = async (evt: Event) => {
		googleRegistrationForm.classList.add(Classes.LOADING)
	}

	const handlePaymentMethod = async (evt: Event) => {
		const target = evt.target as HTMLSelectElement
		method = target.value
	}

	onMount(() => {
		const locationUrl = new URL(location.href);
		redirectSuffix = locationUrl.searchParams.get('redirectTo') as string;
		referer = locationUrl.searchParams.get('referer') as string;

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
</script>

<svelte:head>
	<title>Register | DHUB Education</title>
</svelte:head>
<div>
	<section class="py-4 acenter">
		{#if session}
			<form
				id="register"
				action="?/google"
				bind:this={googleRegistrationForm}
				on:submit={handleGoogleSubmit}
				class="mx-auto md:pb-4 md:max-w-lg bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg overflow-hidden flex flex-col p-4 gap-4 w-full text-center"
				enctype="multipart/form-data"
				use:enhance
				method="post">
				<h1 class="sub-title uppercase">Register to continue</h1>
				<hr class="dark:opacity-30" />
				<div class="flex flex-col gap-4">
					<input type="text" hidden name="redirect" bind:value={redirectSuffix} />
					<input type="text" hidden name="referer" bind:value={referer} />
					<input type="text" hidden name="countryName" bind:value={countryName} />
					<input type="text" hidden name="role" value={Constants.USER} />
					<input type="text" hidden name="countryCode" bind:value={countryCode} />
					<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							name="name"
							class="input input-bordered w-full bg-transparent dark:text-white"
							id="name"
							hidden
							bind:value={session.name}
							required
							placeholder="Full name"
						/>
						<input
							type="text"
							name="email"
							class="input input-bordered w-full bg-transparent dark:text-white"
							id="email"
							bind:value={session.email}
							hidden
							required
							placeholder="Email address"
						/>
						<input type="text" hidden name="authtype" value={Constants.GOOGLE} />
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
							required>
							<option disabled selected>Type of Referer</option>
							<option class="dark:text-font" value="Customer">Customer</option>
							<option class="dark:text-font" value="Employee">Employee</option>
							<option class="dark:text-font" value="Influencer">Influencer</option>
							<option class="dark:text-font" value="Teacher">Teacher</option>
							<option class="dark:text-font" value="Vendor">Vendor</option>
						</select>
						<select
							class="select select-bordered w-full bg-transparent dark:text-white"
							name="countryOfInterest"
							required>
							<option disabled selected>Country of Interest</option>
							<option class="dark:text-font" value="United States of America">USA (For UK students)</option>
							<option class="dark:text-font" value="Malta">Malta</option>
							<option class="dark:text-font" value="France (Paris)">France (Paris)</option>
							<option class="dark:text-font" value="United Kingdom">United Kingdom</option>
							<option class="dark:text-font" value="Netherland">Netherland</option>
							<option class="dark:text-font" value="Canada">Canada</option>
						</select>
						<input
							type="tel"
							name="phoneNumber"
							bind:this={phoneInput}
							class="input input-bordered w-full bg-transparent dark:text-white"
							id="phoneNumber"
							required
							placeholder="Phone Number"
						/>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<select
							class="select select-bordered w-full bg-transparent dark:text-white col-span-2"
							name="paymentMethod"
							on:change={handlePaymentMethod}
							required>
							<option disabled>Payment Method</option>
							<option class="dark:text-font" value="bank" selected>Bank (Nigeria)</option>
							<option class="dark:text-font" value="paypal">PayPal (Other Countries)</option>
						</select>
						<Payment { method } { user } />
					</div>
				</div>
				<Button
					options={{
						dataname: 'register btn',
						isAnchorLink: false,
						btnType: 'submit',
						text: 'register',
						width: 'w-full',
						padding: 'py-3 px-6'
					}}
				/>
				<hr class="dark:opacity-30" />
				<p class="font-semibold flex items-center justify-center gap-2">
					<span>Already have an account?</span>
					<a
						href="/login"
						class="text-red-500 dark:text-white transition duration-150 ease-in-out underline">Login</a>
				</p>
			</form>
		{:else}
			<form
				id="register"
				action="?/emailandpassword"
				on:submit|preventDefault={handleEmailAndPasswordSubmit}
				class="mx-auto md:pb-4 md:max-w-lg bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg overflow-hidden flex flex-col p-4 gap-4 w-full text-center"
				enctype="multipart/form-data"
				use:enhance
				method="post">
				<h1 class="sub-title uppercase">Register to continue</h1>
				<hr class="dark:opacity-30" />
				<div class="flex flex-col gap-4">
					<input type="text" hidden name="redirect" bind:value={redirectSuffix} />
					<input type="text" hidden name="referer" bind:value={referer} />
					<input type="text" hidden name="countryName" bind:value={countryName} />
					<input type="text" hidden name="role" value={Constants.USER} />
					<input type="text" hidden name="countryCode" bind:value={countryCode} />
					<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />

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
							type="password"
							name="password"
							class="input input-bordered w-full bg-transparent dark:text-white"
							id="password"
							required
							placeholder="Password"
						/>
						<input type="text" hidden name="authtype" value={Constants.EMAILANDPASSWORD} />
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
							required>
							<option disabled selected>Country of Interest</option>
							<option class="dark:text-font" value="United States of America">USA (For UK students)</option>
							<option class="dark:text-font" value="Malta">Malta</option>
							<option class="dark:text-font" value="France (Paris)">France (Paris)</option>
							<option class="dark:text-font" value="United Kingdom">United Kingdom</option>
							<option class="dark:text-font" value="Netherland">Netherland</option>
							<option class="dark:text-font" value="Canada">Canada</option>
						</select>
						<input
							type="tel"
							name="phoneNumber"
							bind:this={phoneInput}
							class="input input-bordered w-full bg-transparent dark:text-white"
							id="phoneNumber"
							required
							placeholder="Phone Number"
						/>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<select
							class="select select-bordered w-full bg-transparent dark:text-white col-span-2"
							name="paymentMethod"
							on:change={handlePaymentMethod}
							required>
							<option disabled>Payment Method</option>
							<option class="dark:text-font" value="bank" selected>Bank (Nigeria)</option>
							<option class="dark:text-font" value="paypal">PayPal (Other Countries)</option>
						</select>
						<Payment { method } { user } />
					</div>

				</div>
				<Button
					options={{
						dataname: 'register btn',
						isAnchorLink: false,
						btnType: 'submit',
						text: 'register',
						width: 'w-full',
						padding: 'py-3 px-6'
					}}
				/>
				<hr class="dark:opacity-30" />
				<p class="font-semibold flex items-center justify-center gap-2">
					<span>Already have an account?</span>
					<a
						href={loginUrl}
						class="text-red-500 dark:text-white transition duration-150 ease-in-out underline"
						>Login</a
					>
				</p>
				<!-- <div aria-label="form-fields" class="flex flex-col p-4 gap-4 w-full text-center">
				</div> -->
			</form>
		{/if}
	</section>
</div>
