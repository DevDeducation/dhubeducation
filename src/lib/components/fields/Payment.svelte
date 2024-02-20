<script lang="ts">
	import { Constants } from '$lib/constants';
	import type { iUser } from '$lib/interfaces';
	import Bank from '../icons/Bank.svelte';
	import PayPal from '../icons/PayPal.svelte';
	import { Input } from '../ui/input';

	export let user: iUser
	export let method: string = Constants.BANK;

</script>

{#if method === Constants.BANK}
<div class="flex flex-col gap-4">
	<div class="flex items-center justify-center gap-4">
		<Bank />
		<p class="sub-title">Bank</p>
	</div>
	<Input
		type="text"
		name="bankName"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.bankName}
		placeholder="Bank Name"
	/>
	<Input
		type="text"
		name="accountName"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.accountName}
		placeholder="Account Name"
	/>
	<Input
		type="number"
		name="accountNumber"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.accountNumber}
		placeholder="Account Number"
	/>
	<Input
		type="text"
		name="sortCode"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.sortCode}
		placeholder="Sort Code"
	/>
	<Input
		type="text"
		name="swiftCode"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.swiftCode}
		placeholder="Swift Code"
	/>
</div>
{:else}
<div class="flex flex-col gap-4">
	<div class="flex items-center justify-center">
		<PayPal />
	</div>
	<Input
		type="text"
		name="paypalEmail"
		class="!border !border-muted dark:bg-transparent"
		required
		bind:value={user.paypalEmail}
		placeholder="PayPal Email"
	/>
</div>
{/if}
