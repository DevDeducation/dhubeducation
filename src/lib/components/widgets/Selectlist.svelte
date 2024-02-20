<script lang="ts">
  import * as Select from "$lib/components/ui/select"; 
	import { cn } from "$lib/utils";
  import { createEventDispatcher } from "svelte";

  export let name: string = ""
  export let label: string = ""
  export let list: { value: string, label: string }[] = []
  export let classes: string = ""
  export let value: string = ""

  $: placeholder = value.length == 0 ? `Select a ${label}` : value

  const dispatch = createEventDispatcher()

  function handleChange(evt: Event) {
    const target = evt.target as HTMLInputElement
    dispatch('change', target.value);
  }
</script>

<Select.Root>
  <Select.Trigger class={cn("dark:bg-transparent dark:border dark:border-muted", classes)}>
    <Select.Value { placeholder } />
  </Select.Trigger>
  <Select.Content class="dark:bg-dark-900 dark:border-none">
    <Select.Group>
      <Select.Label class="capitalize">{label}</Select.Label>
      {#each list as item (item.value)}
        <Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input { value } { name } on:input={handleChange} />
</Select.Root>