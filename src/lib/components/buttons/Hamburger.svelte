<script lang="ts">
  import { utilsstore } from "$lib/stores/utilsstore";
	import { Button } from "../ui/button";

</script>


<Button variant="outline" size="icon" on:click={$utilsstore.toggleMobileNav} class="rounded-lg shadow-custom dark:bg-dark-700 md:hidden">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 sm:w-4 sm:h-4">
    <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
  </svg>
</Button>