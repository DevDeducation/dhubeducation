<script lang="ts"> 
  import { utilsstore } from '$lib/stores/utilsstore';
	import Avataricon from '../icons/Avataricon.svelte';
	import type { iSession } from '$lib';
  import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte'; 
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { logout } from '$lib/firebase/client';
  // import { session } from '$app/stores'

  // export let session: iSession | undefined

  // console.log("session is", session)
  let user: iSession | undefined = $page.data.userSession
  let registered: Record<string, any> = $page.data.registered

	const remove = ['p-2', 'rounded-lg', 'sm:w-8', 'sm:h-8',];

	const add = ['w-[40px]', 'h-[40px]', 'rounded-full', 'text-primary'];

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

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <div class={avatarClass}>
      <span class:bg-green-500={isOnline} class:bg-red-500={!isOnline} class={statusClassName}></span>
      {#if user?.picture}
        <img src={user.picture} class="w-[40px] h-[40px] rounded-full" alt={user.name} loading="lazy"/>
      {:else}
        <Avataricon />
      {/if}
    </div>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="dark:bg-dark-900 border-none">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Welcome {name}</DropdownMenu.Label>
      <DropdownMenu.Separator />
      {#if user}
        <DropdownMenu.Item><a href="/profile" class="h-[40px] flex items-center w-full">Profile</a></DropdownMenu.Item>
        <DropdownMenu.Item><a href="/affiliate" class="h-[40px] flex items-center w-full">Affiliate</a></DropdownMenu.Item>
        <DropdownMenu.Item><a href="/referral" class="h-[40px] flex items-center w-full">Referral</a></DropdownMenu.Item>
        <DropdownMenu.Item><button aria-label="signout button" data-name="signout btn" class="h-[40px] flex items-center w-full" on:click={logout}>Signout</button></DropdownMenu.Item>
      {:else}
      <DropdownMenu.Item><a href="/register" class="h-[40px] flex items-center w-full">Register</a></DropdownMenu.Item>
      <DropdownMenu.Item><a href="/login" class="h-[40px] flex items-center w-full">Signin</a></DropdownMenu.Item>
      {/if}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>