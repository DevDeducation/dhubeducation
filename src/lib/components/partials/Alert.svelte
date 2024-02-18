<script lang="ts">
	import { Alerts } from '$lib/constants';
	import type { TAlert, iAlert } from '$lib/interfaces';
	import Error from '../icons/Error.svelte';
	import Success from '../icons/Success.svelte';
	import Warning from '../icons/Warning.svelte';
	import Info from './../icons/Info.svelte';
  import { alertstore } from '$lib/stores/utilsstore';


  let alert: iAlert

  const icon = (type: TAlert) => {
    switch (type) {
      case Alerts.INFO: return Info;
      case Alerts.ERROR: return Error;
      case Alerts.WARNING: return Warning;
      case Alerts.SUCCESS: return Success;
    }
  }

</script>


<div role="alert" class:show={$alertstore.active} class={`duration-200 transition-all alert ${$alertstore.type} acenter w-[calc(100%-32px)] flex items-center gap-2 fixed left-1/2 -translate-x-1/2 rounded-lg z-[35]`}>
  <svelte:component this={icon($alertstore.type)}></svelte:component>
	<span>{$alertstore.message}</span>
</div>

<style>
  .alert {
    top: -20%;
  }
  .alert.show {
    top: 8px;
  }
</style>
