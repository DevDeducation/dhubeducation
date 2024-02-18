<script lang="ts">
	import { Input } from '$lib/components/ui/input';
  import { Calendar as CalendarIcon } from "lucide-svelte";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import { format } from "date-fns"
  import { DateInput } from 'date-picker-svelte'

  export let name: string = ""

  let date: Date = new Date()

  $: value = format(date, "MMM. d, yyyy")
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "w-full justify-start text-left font-normal dark:bg-transparent",
        !value && "text-muted-foreground"
      )}
      builders={[builder]}>
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? value : "Pick a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0 dark:border-none" align="start">
    <DateInput class="dark:bg-dark" bind:value={date} />
  </Popover.Content>
  <Input { name } type="hidden" bind:value />
</Popover.Root>