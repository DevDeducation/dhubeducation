<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';

	interface iRadio {
		label: string;
		value: string;
	}

	export let list: iRadio[] = [];
	export let name: string;
</script>

<RadioGroup.Root value={list[0].value}>
	{#each list as { label, value } (label)}
		<div class="flex w-full items-center space-x-2">
			<RadioGroup.Item {value} id={value} />
			<Label for={value} class="w-[calc(100%-16px)] cursor-pointer py-2">{label}</Label>
		</div>
	{/each}
	<RadioGroup.Input {name} />
</RadioGroup.Root>
