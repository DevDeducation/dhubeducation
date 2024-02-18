<script lang="ts">
	import Header from '$lib/components/sections/Header.svelte';
	import "../../app.css"
	import Footer from '$lib/components/sections/Footer.svelte';
	import Modal from '$lib/components/partials/Modal.svelte';
	import MobileNavigation from '$lib/components/sections/MobileNavigation.svelte';
	import Alert from '$lib/components/partials/Alert.svelte';
	import SocialMediaBtns from '$lib/components/sections/SocialMediaBtns.svelte';
	import ClickToChatFab from '$lib/components/buttons/ClickToChatFab.svelte';
	import { handleClick, popup } from '$lib';
	import CookieConsentBtn from '$lib/components/buttons/CookieConsentBtn.svelte'; 

	let popupBtnRef: HTMLButtonElement
	
	$: popupBtnRef && popupBtnRef.click()
</script>

<div class="bg-body dark:bg-dark-950 text-font dark:text-dark-100"> 
	<SocialMediaBtns />
	<Header />
	<Alert />
	<main class="transition-transform duration-200 ease-in-out overflow-hidden flex flex-col">
		<slot />
	</main> 
	<Footer /> 
	<Modal />
	<MobileNavigation />
	<!-- <CookieConsentBtn /> -->
	<button 
		aria-label="popup button"
		bind:this={popupBtnRef}
		class="relative flex items-center justify-center" on:click={handleClick} 
		data-name="play-image"
		data-media={JSON.stringify(popup)}>
	</button>
</div>
