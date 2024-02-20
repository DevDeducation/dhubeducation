<script lang="ts">
	import { page } from '$app/stores';
	import {
		Alerts,
		Classes,
		Constants,
		Events,
		Flags,
		educationlist,
		referrallist,
		type iEmailPassword,
		type iSession,
		type iUser,
		paymentmethodlist,
		type iValueLabel
	} from '$lib';
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
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Selectlist from '$lib/components/widgets/Selectlist.svelte';

	let loginUrl = '/login';

	const session: iSession = $page.data.userSession;

	const user: iUser = {
		id: 1,
		address: '',
		authtype: '',
		countryCode: '',
		countryName: '',
		countryIsoCode: '',
		countryOfInterest: '',
		email: '',
		levelOfStudy: '',
		name: '',
		phoneNumber: '',
		role: '',
		typeOfReferral: '',
		referer: '',
		timestamp: '',
		confirmed: '',
		paid: '',
		actions: '',
		nameOfSchool: '',
		tuition: '',
		currency: '',
		yearOfStudy: '',
		paymentMethod: '',
		paypalEmail: '',
		bankName: '',
		accountName: '',
		accountNumber: '',
		sortCode: '',
		swiftCode: ''
	};

	let phoneInput: HTMLElement;
	let googleRegistrationForm: HTMLFormElement;

	let redirectSuffix: string = '';
	let referer: string = $utilsstore.encodeString(Constants.DHUBEDUCATION_GMAIL).toString();
	let countryName: string = 'Nigeria';
	let countryCode: string = '+234';
	let countryIsoCode: string = 'ng';
	let phoneInputIntl: intlTelInput.Plugin;

	let method: string = Constants.BANK;

	$: {
		if (browser) {
			const { url, params } = $utilsstore.urlParams();
			getRedirect() && (loginUrl += params);
			const urlReferer = url.searchParams.get('referer');

			referer = urlReferer
				? urlReferer
				: $utilsstore.encodeString(Constants.DHUBEDUCATION_GMAIL).toString();
			console.log(
				'referer is',
				referer,
				'urlReferer is',
				urlReferer,
				'typeof urlReferer',
				typeof urlReferer
			);
		}
	}

	const handleCountryChange = (evt: Event) => {
		countryCode = `+${phoneInputIntl.getSelectedCountryData().dialCode}`;
		countryIsoCode = phoneInputIntl.getSelectedCountryData().iso2;
		countryName = phoneInputIntl.getSelectedCountryData().name;
	};

	const handleEmailAndPasswordSubmit = async (evt: SubmitEvent) => {
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const records = Object.fromEntries(formData.entries()) as Record<string, any>;
		console.log('records', records);
		const emailPassword: iEmailPassword = {
			email: records.email as string,
			password: records.password as string
		};
		delete records.password;
		delete records.redirect;

		records.confirmed = Flags.TRUE;
		records.paid = Flags.FALSE;

		const button = evt.submitter as HTMLElement;
		try {
			button.classList.add(Classes.LOADING);
			await handleRegisterWithEmailAndPassword(emailPassword);

			console.log('submitted records', records);
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
		googleRegistrationForm.classList.add(Classes.LOADING);
	};

	const handleChange = (evt: CustomEvent) => {
		console.log(evt);
		const detail = evt.detail as iValueLabel;
		method = detail.value;
	};

	const handlePaymentMethod = async (evt: Event) => {
		const target = evt.target as HTMLSelectElement;
		method = target.value;
	};

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
			initialCountry: 'ng'
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
	<section class="acenter py-4">
		{#if session}
			<form
				id="register"
				action="?/google"
				bind:this={googleRegistrationForm}
				on:submit={handleGoogleSubmit}
				class="mx-auto flex w-full flex-col gap-4 overflow-hidden rounded-lg text-center shadow-custom md:max-w-4xl md:pb-4"
				enctype="multipart/form-data"
				use:enhance
				method="post"
			>
				<h1 class="sub-title uppercase">Register to continue</h1>
				<hr class="dark:opacity-30" />
				<div class="flex flex-col gap-4">
					<input type="text" hidden name="redirect" bind:value={redirectSuffix} />
					<input type="text" hidden name="referer" bind:value={referer} />
					<input type="text" hidden name="countryName" bind:value={countryName} />
					<input type="text" hidden name="role" value={Constants.USER} />
					<input type="text" hidden name="countryCode" bind:value={countryCode} />
					<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Input
								type="text"
								name="name"
								class="!border !border-muted dark:bg-transparent"
								id="name"
								hidden
								bind:value={session.name}
								required
								placeholder="Full name"
							/>
							<Input
								type="text"
								name="email"
								class="!border !border-muted dark:bg-transparent"
								id="email"
								bind:value={session.email}
								hidden
								required
								placeholder="Email address"
							/>
							<input type="text" hidden name="authtype" value={Constants.GOOGLE} />
							<Input
								type="text"
								name="address"
								class="!border !border-muted dark:bg-transparent"
								id="address"
								required
								placeholder="Home address"
							/>
							<Selectlist name="levelOfStudy" label="Level of study" list={educationlist} />
							<Selectlist
								name="typeOfReferral"
								label="Type of Referral"
								list={referrallist}
								classes="md:col-span-2"
							/>
							<Selectlist
								name="countryOfInterest"
								label="Country of Interest"
								list={referrallist}
								classes="md:col-span-2"
							/>
							<div class="md:col-span-2">
								<input
									type="tel"
									name="phoneNumber"
									bind:this={phoneInput}
									class="flex h-10 w-full rounded-md !border !border-muted bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-transparent"
									id="phoneNumber"
									required
									placeholder="Phone Number"
								/>
							</div>
							<Selectlist
								name="paymentMethod"
								label="Payment Method"
								list={paymentmethodlist}
								on:change={handleChange}
								classes="md:col-span-2"
							/>
						</div>
						<Payment {method} {user} />
					</div>
				</div>
				<Button type="submit" class="text-white w-fit mx-auto">Register</Button>
				<hr class="dark:opacity-30" />
				<p class="flex items-center justify-center gap-2 font-semibold">
					<span>Already have an account?</span>
					<a
						href="/login"
						class="text-red-500 underline transition duration-150 ease-in-out dark:text-white"
						>Login</a
					>
				</p>
			</form>
		{:else}
			<form
				id="register"
				action="?/emailandpassword"
				on:submit|preventDefault={handleEmailAndPasswordSubmit}
				class="mx-auto flex w-full flex-col gap-4 overflow-hidden rounded-lg text-center shadow-custom md:max-w-4xl md:pb-4"
				enctype="multipart/form-data"
				use:enhance
				method="post"
			>
				<h1 class="sub-title uppercase">Register to continue</h1>
				<hr class="dark:opacity-30" />
				<input type="text" hidden name="redirect" bind:value={redirectSuffix} />
				<input type="text" hidden name="referer" bind:value={referer} />
				<input type="text" hidden name="countryName" bind:value={countryName} />
				<input type="text" hidden name="role" value={Constants.USER} />
				<input type="text" hidden name="countryCode" bind:value={countryCode} />
				<input type="text" hidden name="countryIsoCode" bind:value={countryIsoCode} />
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Input
							type="text"
							name="name"
							class="!border !border-muted dark:bg-transparent"
							id="name"
							required
							placeholder="Full name"
						/>
						<Input
							type="text"
							name="email"
							class="!border !border-muted dark:bg-transparent"
							id="email"
							required
							placeholder="Email address"
						/>
						<Input
							type="password"
							name="password"
							class="!border !border-muted dark:bg-transparent"
							id="password"
							required
							placeholder="Password"
						/>
						<input type="text" hidden name="authtype" value={Constants.EMAILANDPASSWORD} />
						<Input
							type="text"
							name="address"
							class="!border !border-muted dark:bg-transparent"
							id="address"
							required
							placeholder="Home address"
						/>
						<Selectlist name="levelOfStudy" label="Level of study" list={educationlist} />
						<Selectlist name="typeOfReferral" label="Type of Referral" list={referrallist} />
						<Selectlist
							name="countryOfInterest"
							label="Country of Interest"
							list={referrallist}
							classes="md:col-span-2"
						/>
						<div class="md:col-span-2">
							<input
								type="tel"
								name="phoneNumber"
								bind:this={phoneInput}
								class="flex h-10 w-full rounded-md !border !border-muted bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-transparent"
								id="phoneNumber"
								required
								placeholder="Phone Number"
							/>
						</div>
						<Selectlist
							name="paymentMethod"
							label="Payment Method"
							list={paymentmethodlist}
							on:change={handleChange}
							classes="md:col-span-2"
						/>
					</div>
					<Payment {method} {user} />
				</div>
				<Button type="submit" class="mx-auto w-full text-white md:w-fit">Register</Button>
				<hr class="dark:opacity-30" />
				<p class="flex items-center justify-center gap-2 font-semibold">
					<span>Already have an account?</span>
					<a
						href={loginUrl}
						class="text-red-500 underline transition duration-150 ease-in-out dark:text-white"
						>Login</a
					>
				</p>
				<!-- <div aria-label="form-fields" class="flex flex-col p-4 gap-4 w-full text-center">
				</div> -->
			</form>
		{/if}
	</section>
</div>
