<script lang="ts">
	import { Input } from '$lib/components/ui/input';
  import { Calendar as CalendarIcon } from "lucide-svelte";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone
  } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import * as Popover from "$lib/components/ui/popover";

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  export let name: string = ""

  let value: DateValue | undefined = undefined;
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
      {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0 dark:border-none" align="start">
    <Calendar bind:value class="dark:bg-dark-900" />
  </Popover.Content>
  <Input { name } type="hidden" bind:value />
</Popover.Root>