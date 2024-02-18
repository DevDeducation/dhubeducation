<script lang="ts">
  import * as Select from "$lib/components/ui/select"; 
	import { cn } from "$lib/utils";

  export let name: string = ""
  export let label: string = ""
  export let list: { value: string, label: string }[] = []
  export let classes: string = ""
</script>

<Select.Root>
  <Select.Trigger class={cn("dark:bg-transparent dark:border-muted-foreground", classes)}>
    <Select.Value placeholder={`Select a ${label}`} />
  </Select.Trigger>
  <Select.Content class="dark:bg-dark-900 dark:border-none">
    <Select.Group>
      <Select.Label class="capitalize">{label}</Select.Label>
      {#each list as item (item.value)}
        <Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input { name }/>
</Select.Root>