<script lang="ts">
	import { links, type iButton } from '$lib';
	import { utilsstore } from '$lib/stores/utilsstore';
	import Email from '../icons/Email.svelte';
	import LogoWhite from '../icons/LogoWhite.svelte';
	import WhatsApp from '../icons/WhatsApp.svelte';
	import Followuslinks from '../partials/Followuslinks.svelte';
	import { Button } from '../ui/button';

	$: year = new Date().getFullYear();
</script>

<section class="py-4 text-white bg-dark-900 border-t border-t-white/25">
	<footer class="acenter flex flex-col gap-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
			<nav class="flex flex-col gap-2">
				<LogoWhite />
				<p class="hidden md:block">Empowering international<br/>education journeys!</p>
				<p class="block md:hidden">Empowering international education journeys!</p>
        <hr class="opacity-40 border-white/40" />
				<div class="grid grid-cols-1 gap-4 place-items-start">
					<a
						href="https://api.whatsapp.com/send?phone=+447930739927&text=Hello"
						aria-label="call us on line 1"
						class="-phone flex justify-center items-center gap-1">
            <WhatsApp />
						<span>Chat with us</span>
					</a>
					<a
						href="mailto:dhubeducation@gmail.com?subject=Inquiries"
						aria-label="send us an email"
						class="-email flex justify-center items-center gap-1">
						<Email />
						<span>Email Us</span>
					</a>
				</div>
			</nav>
			<nav class="flex flex-col">
				<header class="mb-0 text-white/80 underline uppercase font-semibold">Company</header>
				{#each links.company.submenu as menu, i}
					<a aria-label={menu.arialabel} href={menu.url} class="link link-hover py-2">{menu.name}</a
					>
				{/each}
			</nav>
			<nav class="flex flex-col">
				<header class="mb-0 text-white/80 underline uppercase font-semibold">Services</header>
				{#each links.services.submenu as menu, i}
					<a aria-label={menu.arialabel} href={menu.url} class="link link-hover py-2">{menu.name}</a
					>
				{/each}
			</nav>
			<nav class="flex flex-col">
				<header class="mb-0 text-white/80 underline uppercase font-semibold">Legal</header>
				{#each links.legal.submenu as menu, i}
					<a aria-label={menu.arialabel} href={menu.url} class="link link-hover py-2">{menu.name}</a
					>
				{/each}
			</nav>
			<nav class="flex flex-col gap-4">
				<header class="text-white/80 underline uppercase font-semibold">{links.followus.name}</header>
				<div class="text-font dark:text-white">
					<Followuslinks />
				</div>
				<Button variant="outline" class="bg-transparent w-full">
					<a href="/enquiry" class="flex justify-center items-center text-white font-semibold">Enquiry</a>
				</Button>
			</nav>
		</div>
		<hr class="opacity-40 border-white/40" />
		<div class="flex flex-col items-center justify-center gap-4 max-w-5xl mx-auto">
			<div class="text-center flex flex-col items-center gap-4 shadow-custom rounded-lg p-4 bg-dark-800 w-full">
				<div class="flex items-center gap-2">
					<img class="w-8" src={$utilsstore.flag("gb")} alt="UK"/>
					<span class="uppercase font-semibold">United Kingdom</span>
				</div>
				<p>5 Union Street, City View House, Manchester M12 4JD Manchester UK</p>
			</div>
			<div class="text-center flex flex-col items-center gap-4 shadow-custom rounded-lg p-4 bg-dark-800 w-full">
				<div class="flex items-center gap-2">
					<img class="w-8" src={$utilsstore.flag("ng")} alt="Nigeria"/>
					<span class="uppercase font-semibold">Nigeria</span>
				</div>
				<p>5 Afisman Drive, Anifowoshe, Ikeja Lagos, Nigeria</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				<div class="text-center flex flex-col items-center gap-4 shadow-custom rounded-lg p-4 bg-dark-800">
					<div class="flex items-center gap-2">
						<img class="w-8" src={$utilsstore.flag("gh")} alt="Ghana"/>
						<span class="uppercase font-semibold">Ghana</span>
					</div>
					<p>Coming Soon!</p>
				</div>
				<div class="text-center flex flex-col items-center gap-4 shadow-custom rounded-lg p-4 bg-dark-800">
					<div class="flex justify-start gap-2">
						<img class="w-8" src={$utilsstore.flag("us")} alt="United States"/>
						<span class="uppercase font-semibold">USA</span>
					</div>
					<p>Coming Soon!</p>
				</div>
			</div>
		</div>
		<div class="text-center inline-block align-middle">
			©&nbsp;{year}&nbsp;DHUB Education. All Rights Reserved.
		</div>
	</footer>
</section>
