<script lang="ts">
	import { logout } from '$lib/firebase/client';
  import { utilsstore } from '$lib/stores/utilsstore';
	import Avataricon from '../icons/Avataricon.svelte';
	import type { iSession } from '$lib';
  import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import OnlineStatus from '../widgets/OnlineStatus.svelte';
  // import { session } from '$app/stores'

  // export let session: iSession | undefined

  // console.log("session is", session)
  let user: iSession | undefined = $page.data.userSession
  let registered: Record<string, any> = $page.data.registered

	const remove = ['p-2', 'rounded-lg'];

	const add = ['w-[40px]', 'h-[40px]', 'sm:w-8', 'sm:h-8', 'rounded-full', 'text-primary'];

  const avatarClass = `avatar relative ${$utilsstore.getBtnClasses(remove, add).join(" ")}`

  const userName = registered?.name || user?.name
  const name = userName ? userName.split(" ")[0] : ""
  

  const statusClassName = 'absolute top-0 right-0 rounded-full w-3 h-3'
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

<div class="flex flex-col justify-center items-center">
  <div class="dropdown dropdown-end">
    <button class="m-1" aria-label="avatar">
      <div class={avatarClass}>
        <span class:bg-green-500={isOnline} class:bg-red-500={!isOnline} class={statusClassName}></span>
        {#if user?.picture}
          <img src={user.picture} class="w-[40px] h-[40px] rounded-full" alt={user.name} loading="lazy"/>
        {:else}
          <Avataricon />
        {/if}
      </div>
    </button>
    <ul class="dropdown-content z-10 menu p-0 py-1 pb-0 shadow bg-white dark:bg-dark-800 rounded-lg w-60">
      <li class="opacity-60 h-[40px]">
        <span class="h-[40px] flex items-center w-full">Welcome {name}</span>  
      </li> 
      <hr class="dark:opacity-30"/>
      {#if user}
        <li><a href="/affiliate" class="h-[40px] flex items-center w-full">Affiliate</a></li>
        <li><a href="/profile" class="h-[40px] flex items-center w-full">Profile</a></li>
        <li><a href="/referral" class="h-[40px] flex items-center w-full">Referral</a></li>
        <li><button aria-label="signout button" data-name="signout btn" class="h-[40px] flex items-center w-full" on:click={logout}>Signout</button></li>
      {:else}
        <li><a href="/register" class="h-[40px] flex items-center w-full">Register</a></li>
        <li><a href="/login" class="h-[40px] flex items-center w-full">Signin</a></li>
      {/if}
    </ul>
  </div>

</div>