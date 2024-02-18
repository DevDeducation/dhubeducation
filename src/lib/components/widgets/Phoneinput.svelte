<script lang="ts">
	import { Events } from '$lib';
	import intlTelInput from 'intl-tel-input';
	import { onMount, onDestroy } from 'svelte';
	import '../../../styles/intlTelInput.min.css';

	let phoneInput: HTMLElement;

	let countryName: string = 'Nigeria';
	let countryCode: string = '+234';
	let countryIsoCode: string = 'ng';
	let phoneInputIntl: intlTelInput.Plugin;


	const handleCountryChange = (evt: Event) => {
		countryCode = `+${phoneInputIntl.getSelectedCountryData().dialCode}`;
		countryIsoCode = phoneInputIntl.getSelectedCountryData().iso2;
		countryName = phoneInputIntl.getSelectedCountryData().name;
	};

	onMount(() => {
		// handling international phone input
		phoneInputIntl = intlTelInput(phoneInput, {
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


<input
  type="tel"
  name="phoneNumber"
  bind:this={phoneInput}
  class="h-10 w-full !border !border-muted"
  id="phoneNumber"
  required
  placeholder="Phone Number"
  />
<input type="text" hidden name="countryCode" bind:value={countryCode} />
<input type="text" hidden name="countryISOCode" bind:value={countryIsoCode} />
<input type="text" hidden name="countryName" bind:value={countryName} />