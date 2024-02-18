<script lang="ts">
	import { utils } from "$lib/utils";
	import Edit from "../icons/Edit.svelte";

  
</script>
<button aria-label="edit button" class={utils.getBtnClasses().join(" ")}>
  <Edit />
</button>