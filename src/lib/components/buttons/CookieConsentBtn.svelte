<script lang="ts">

	import Cookie from "../icons/Cookie.svelte";
  import { config, run, showPreferences } from "$lib"
	import { onMount } from "svelte";
  import 'vanilla-cookieconsent/dist/cookieconsent.css'

  onMount(() => run(config))

</script>


<button on:click={() => showPreferences()} class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary dark:bg-white shadow-custom !p-0 text-white dark:text-primary" id="cookieConsentBtn">
  <Cookie />
</button>