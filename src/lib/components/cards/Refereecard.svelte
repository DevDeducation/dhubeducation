<script lang="ts">
	import { Classes, Attributes, AttributeValues } from "$lib/constants";
	import type { iReferee, iStatusColor } from "$lib/interfaces";
  import { utilsstore } from "$lib/stores/utilsstore";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let referee: iReferee
  
	const handleDeleteEvent = (parent: HTMLElement) => {
		parent.classList.add(Classes.LOADING);
		const grandparent = parent.parentElement as HTMLElement;
		const encoded = grandparent.getAttribute(Attributes.DATAENCODED) as string;
		const email = $utilsstore.decodeString(encoded);
		dispatch(AttributeValues.DELETE, { email });
	};

	const handleClick = (evt: Event) => {
		const target = evt.target as HTMLElement;
		const name = target.getAttribute(Attributes.DATANAME);
		const parent = target.parentElement as HTMLElement;

		switch (name) {
			case AttributeValues.EDIT:
				return parent.classList.add(Classes.LOADING);
			case AttributeValues.DELETE:
				return handleDeleteEvent(parent);
		}
	};

  const { status, color } = $utilsstore.status(referee) as iStatusColor
  const statusClassName = `uppercase text-2xs ${color} rounded-[50px] py-1 px-2 absolute right-0 bottom-0 font-semibold`
</script>

<div class="flex flex-col gap-4 shadow-custom bg-white dark:bg-dark-800 p-4 rounded-lg relative">
  <div class="flex gap-2 relative">
    <span class={statusClassName}>{status}</span>
    <div>
      <p>{referee.name}</p>
      <p class="opacity-70 font-normal text-sm">{referee.email}</p>
      <p class="opacity-70 font-normal text-sm">{referee.countryCode} {referee.phoneNumber}</p>
      <p class="opacity-70 font-normal text-sm">{referee.countryName}</p>
    </div>
  </div>
  
  <hr class="dark:opacity-30"/>
  <div class="flex justify-between items-center">
    <img class="w-12" src={$utilsstore.flag(referee.countryIsoCode)} alt={referee.countryName}>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex items-center gap-4" data-encoded="{$utilsstore.encodeString(referee.email)}" on:click={handleClick}>
      <a href="/referral/edit/{$utilsstore.encodeString(referee.email)}" class="group flex justify-center items-center gap-1 border-2 font-medium rounded-lg uppercase text-xs py-2 px-3 relative">
        <span class="clickable" data-name="edit"></span>
        <span class="spin-loader"></span>
        <svg fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4 group-[.-loading]:hidden"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
        <span>Edit</span>	
      </a>
      <!-- <button type="submit" class="group flex justify-center items-center gap-1 border-2 font-medium rounded-lg uppercase text-xs py-2 px-3 relative">
        <span class="clickable" data-name="delete"></span>
        <span class="spin-loader"></span>
        <input hidden name="email" value="{referee.email}" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 group-[.-loading]:hidden">
          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
        </svg>
        <span>Delete</span>	
      </button> -->
    </div>
  </div>
</div>