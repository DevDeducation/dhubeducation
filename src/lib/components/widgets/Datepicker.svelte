<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { format } from 'date-fns';
	import { DateInput } from 'date-picker-svelte';

	export let name: string = '';
	export let label: string = '';

	let date: Date = new Date();

	$: value = format(date, 'MMM. d, yyyy');
</script>

<div class="flex flex-col gap-2">
	<p class="text-sm text-muted-foreground">{label}</p>
	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={cn(
					'w-full justify-start text-left font-normal dark:bg-transparent',
					!value && 'text-muted-foreground'
				)}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{value ? value : 'Pick a date'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0 dark:border-none" align="start">
			<DateInput class="dark:bg-dark" bind:value={date} min={new Date("1900-01-01 00:00:00")} max={new Date("2030-01-01 00:00:00")} />
		</Popover.Content>
		<Input {name} type="hidden" bind:value />
	</Popover.Root>
</div>
