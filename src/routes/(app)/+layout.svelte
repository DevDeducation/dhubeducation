<script lang="ts">
	import Header from '$lib/components/sections/Header.svelte';
	import "../../app.css"
	import Footer from '$lib/components/sections/Footer.svelte';
	import Modal from '$lib/components/partials/Modal.svelte';
	import MobileNavigation from '$lib/components/sections/MobileNavigation.svelte';
	import Alert from '$lib/components/partials/Alert.svelte';
	import SocialMediaBtns from '$lib/components/sections/SocialMediaBtns.svelte';
	import { handleClick, popup } from '$lib';
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from 'svelte-french-toast';
	import Countdown from '$lib/components/widgets/Countdown.svelte';

	let popupBtnRef: HTMLButtonElement
	
	$: popupBtnRef && popupBtnRef.click()
</script>

<div class="bg-body dark:bg-dark-950 text-font dark:text-dark-100 overflow-hidden"> 
	<Toaster />
	<ModeWatcher />
	<!-- <SocialMediaBtns /> -->
	<Countdown />
	<Header />
	<Alert />
	<main class="transition-transform duration-200 ease-in-out overflow-hidden flex flex-col">
		<slot />
	</main> 
	<Footer /> 
	<Modal />
	<MobileNavigation /> 
	<button 
		aria-label="popup button"
		bind:this={popupBtnRef}
		class="relative flex items-center justify-center" on:click={handleClick} 
		data-name="play-image"
		data-media={JSON.stringify(popup)}>
	</button>
</div>
