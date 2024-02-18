<script lang="ts">
  import * as Select from "$lib/components/ui/select";
	import { cn } from "tailwind-variants";

  export let name: string = ""
  export let list: { value: string, label: string }[] = []
  export let classes: string = ""
</script>

<Select.Root>
  <Select.Trigger class={cn(classes, "dark:bg-transparent")}>
    <Select.Value placeholder={`Select a ${name}`} />
  </Select.Trigger>
  <Select.Content class="dark:bg-dark-900 dark:border-none">
    <Select.Group>
      <Select.Label class="capitalize">{name}</Select.Label>
      {#each list as item (item.value)}
        <Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input { name }/>
</Select.Root>