<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";


  let isOnline = true

  $: {
    if (browser) {
      isOnline = navigator.onLine
    }
  }

  onMount(() => {
    // update the isOnline variable when online/offline status changes
    const handleOnlineStatusChange = () => {
      isOnline = navigator.onLine
    }

    // listen for online/offline events
    addEventListener('online', handleOnlineStatusChange)
    addEventListener('offline', handleOnlineStatusChange)

    // cleanup event listeners on component destruction
    return () => {
      removeEventListener('online', handleOnlineStatusChange)
      removeEventListener('offline', handleOnlineStatusChange)
    }
  })
</script>

<p class="py-0 text-2xs uppercase font-semibold text-center">{isOnline ? 'Online' : 'Offline'}</p>