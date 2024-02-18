<!-- Modal.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
	import Followuslinks from './Followuslinks.svelte';

  export let isOpen = false;
  export let content: string;

  const closeModal = () => {
    isOpen = false;
    localStorage.setItem('modalClosed', 'true'); // Store a flag in localStorage
  };
</script>

<div class={`${isOpen ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center z-50`}>
  <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
    
    <div class="img flex flex-col gap-2">
      <Followuslinks />
      <img class="w-full aspect-square" src="" alt="popup"/>
    </div>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={closeModal}>Close</button>
  </div>
</div>
