<script lang="ts">
	import ClickToChatFab from "$lib/components/buttons/ClickToChatFab.svelte";
	import CookieConsentBtn from "$lib/components/buttons/CookieConsentBtn.svelte";
	import Alert from "$lib/components/partials/Alert.svelte";
	import Footer from "$lib/components/sections/Footer.svelte";
	import Header from "$lib/components/sections/Header.svelte";
	import MobileNavigation from "$lib/components/sections/MobileNavigation.svelte";
	import "../../app.css"
	
</script>

<div class="bg-body dark:bg-dark-950 text-font dark:text-dark-100"> 
	<Header />
	<Alert />
	<slot />
	<MobileNavigation />
	<ClickToChatFab />
	<CookieConsentBtn />
	<Footer />
</div>