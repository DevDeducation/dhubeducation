<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import Label from "$lib/components/ui/label/label.svelte";
  import { Input } from "../ui/input";
  let checked = false;

  export let label: string = ""
  export let group: string[] = []
  export let name: string = ""
</script>

<div class="flex items-center space-x-2">
  <Checkbox id={name} bind:checked />
  <Label
    for={name}
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {label}
  </Label>
</div>