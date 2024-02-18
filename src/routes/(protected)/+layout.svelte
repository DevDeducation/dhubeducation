<script lang="ts">
	import '../../app.css';
	import Profile from '$lib/components/icons/Profile.svelte';
	import Grid from '$lib/components/icons/Grid.svelte';
	import LogoWhite from '$lib/components/icons/LogoWhite.svelte';
	import Alert from '$lib/components/partials/Alert.svelte';
	import Modal from '$lib/components/partials/Modal.svelte';
	import Header from '$lib/components/sections/Header.svelte';
	import MobileNavigation from '$lib/components/sections/MobileNavigation.svelte';
	import List from '$lib/components/icons/List.svelte';
	import { AttributeValues, Attributes, Classes } from '$lib'; 
	import { isloading, pagestore } from '$lib/stores/utilsstore';
	import Footer from '$lib/components/sections/Footer.svelte';
	import About from '$lib/components/icons/About.svelte';
	import Finance from '$lib/components/icons/Finance.svelte';
	import Home from '$lib/components/icons/Home.svelte';
	import Service from '$lib/components/icons/Service.svelte';
	import ClickToChatFab from '$lib/components/buttons/ClickToChatFab.svelte';
	import CookieConsentBtn from '$lib/components/buttons/CookieConsentBtn.svelte';

	let navLinkParent: HTMLElement
	let email: string | null = null

	const handleClick = (evt: Event) => {
		const target = evt.target as HTMLElement
		const name = target.getAttribute(Attributes.DATANAME)
		if (name === AttributeValues.SIDENAVIGATION) {
			const navlinks = document.querySelectorAll('.navlink')
			$isloading = true
			navLinkParent = target.parentElement as HTMLElement
			navlinks.forEach(navlink => navlink.classList.remove(Classes.LOADING))
			const fxn = navLinkParent.classList
			!fxn.contains(Classes.LOADING) && fxn.add(Classes.LOADING)
		}
	}

	$: {
		if (navLinkParent) {
			const fxn = navLinkParent.classList;
			!$isloading && fxn.remove(Classes.LOADING)
		}
	}

</script>
<div class="bg-body dark:bg-dark-950 text-font dark:text-dark-100">
	<Alert />
	<Header showTitle={true} classes="md:hidden" />
	<section class="grid grid-cols-1 md:grid-cols-[290px_1fr] pt-0">
		<aside class="h-full bg-dark-800 hidden md:flex md:flex-col gap-8 p-4">
			<div class="ml-4">
				<LogoWhite />
			</div>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={handleClick}>
				<ul class="mb-6 flex flex-col gap-1.5">
					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							class:active={$pagestore=="Dashboard"}
							href="/affiliate">
							<span class="clickable group-[.active]:bg-dark-700/40" data-name="side navigation"></span>
							<Grid classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>Dashboard</span>
						</a>
					</li>

					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							class:active={$pagestore=="Profile"}
							href="/profile">
							<span class="clickable group-[.active]:bg-dark-700/40" data-name="side navigation"></span>
							<Profile classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>Profile</span>
						</a>
					</li>
					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							class:active={$pagestore=="Referral"}
							href="/referral">
							<span class="clickable group-[.active]:bg-dark-700/40" data-name="side navigation"></span>
							<List classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>Referral</span>
						</a>

					</li>
				</ul>
				<hr class="opacity-20" />
				<ul class="mb-6 flex flex-col gap-1.5">
					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent active"
							href="/">
							<span class="clickable" data-name="side navigation"></span>
							<Home classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>Home</span>
						</a>
					</li>
					<li>
						<a
							aria-label="about"
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							href="/about-us">
							<span class="clickable" data-name="side navigation"></span>
							<About classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>About</span>
						</a>
					</li>
					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							href="/services">
							<span class="clickable" data-name="side navigation"></span>
							<Service classes="group-[.-loading]:hidden" />
							<span class="spin-loader"></span>
							<span>Services</span>
						</a>
					</li>
					<li>
						<a
							class="navlink group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out !bg-transparent"
							href="/finance">
							<span class="clickable" data-name="side navigation"></span>
							<Finance classes="group-[.-loading]:hidden"  />
							<span class="spin-loader"></span>
							<span>Finance</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
		<main class="transition-transform duration-200 ease-in-out flex flex-col">
			<Header classes="hidden md:block px-4" center={false} showTitle={true} showLogo={false} openRoute={false} />
			<div class="p-4 acenter flex flex-col gap-4">
				<h1 class="uppercase md:hidden">{$pagestore}</h1>
				<slot />
			</div>
		</main>
	</section>
	<Footer />
	<Modal />
	<MobileNavigation />
	<ClickToChatFab />
	<CookieConsentBtn />
</div>
