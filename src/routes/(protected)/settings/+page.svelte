<script lang="ts"> 
	import { isloading, pagestore } from '$lib/stores/utilsstore'; 
	import { onMount, onDestroy } from 'svelte';
 
	$pagestore = "Settings"
	
	onMount(() => $isloading = false) 
</script>

<h1>Settings page</h1>