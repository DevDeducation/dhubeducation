<script lang="ts">
	import { Events } from '$lib';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import type { Selected } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';
	import type { ChangeEvent } from 'sveltekit-superforms';

	export let name: string = '';
	export let label: string = '';
	export let list: { value: string; label: string }[] = [];
	export let classes: string = '';

	const dispatch = createEventDispatcher();

	const onSelectedChange = (evt: Event) => {
    const target = evt.target as HTMLSelectElement
    const selected = target.value
		dispatch(Events.CHANGE, selected);
	};

	const placeholder = `Select a ${label}`;
	const defaultClasses =
		'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 !border !border-muted dark:bg-transparent';
</script>

<!-- <Select.Root onSelectedChange = {(evt) => onSelectedChange(evt)}>
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
</Select.Root> -->

<div class="flex w-full items-center space-x-2">
	<select on:change={onSelectedChange} {name} class={cn(defaultClasses, classes)}>
		{#each list as { label, value } (label)}
			<option {value}>{label}</option>
		{/each}
	</select>
</div>
