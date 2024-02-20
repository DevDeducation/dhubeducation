<script lang="ts">
	import { Events } from "$lib";
  import * as Select from "$lib/components/ui/select"; 
	import { cn } from "$lib/utils";
	import type { Selected } from "bits-ui";
  import { createEventDispatcher } from "svelte";
	import type { ChangeEvent } from "sveltekit-superforms";

  export let name: string = ""
  export let label: string = ""
  export let list: { value: string, label: string }[] = []
  export let classes: string = "" 

  const dispatch = createEventDispatcher()

  const onSelectedChange = (selected: Selected<unknown> | undefined) => {
    dispatch(Events.CHANGE, selected)
  }

  const placeholder = `Select a ${label}`
</script>

<Select.Root onSelectedChange = {(evt) => onSelectedChange(evt)}>
  <Select.Trigger class={cn("dark:bg-transparent dark:border dark:border-muted", classes)}>
    <Select.Value { placeholder }  />
  </Select.Trigger>
  <Select.Content class="dark:bg-dark-900 dark:border-none">
    <Select.Group>
      <Select.Label class="capitalize">{label}</Select.Label>
      {#each list as item (item.value)}
        <Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input { name } on:input={() => console.log("on:input changing inside selectlist.svelte")} />
</Select.Root>