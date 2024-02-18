<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Binoculars from '$lib/components/icons/Binoculars.svelte';
	import '../app.css';
</script>

<section
	aria-label="page not found"
	class="flex flex-col justify-center items-center gap-4 acenter">
	<Binoculars />
	<h1>🥹 Sorry!!! The page could not found</h1>
	<p>{$page?.error?.message}</p>
	<Button>
		<a href="/" class="w-full h-full">return home</a>
	</Button>
</section>
