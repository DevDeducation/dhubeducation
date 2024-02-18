<script lang="ts">
	import { utils } from "$lib/utils/index";
	import Delete from "../icons/Delete.svelte";

  
</script>
<button aria-label="delete button" class={utils.getBtnClasses().join(" ")}>
  <Delete />
</button>