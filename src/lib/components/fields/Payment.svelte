<script lang="ts">
	import { Constants } from '$lib/constants';
	import type { iUser } from '$lib/interfaces';
	import Bank from '../icons/Bank.svelte';
	import PayPal from '../icons/PayPal.svelte';

	export let user: iUser
	export let method: string = Constants.BANK;

</script>

{#if method === Constants.BANK}
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
	<div class="flex items-center justify-center gap-4">
		<Bank />
		<p class="sub-title">Bank</p>
	</div>
	<input
		type="text"
		name="bankName"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.bankName}
		placeholder="Bank Name"
	/>
	<input
		type="text"
		name="accountName"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.accountName}
		placeholder="Account Name"
	/>
	<input
		type="number"
		name="accountNumber"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.accountNumber}
		placeholder="Account Number"
	/>
	<input
		type="text"
		name="sortCode"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.sortCode}
		placeholder="Sort Code"
	/>
	<input
		type="text"
		name="swiftCode"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.swiftCode}
		placeholder="Swift Code"
	/>
</div>
{:else}
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
	<div class="flex items-center justify-center">
		<PayPal />
	</div>
	<input
		type="text"
		name="paypalEmail"
		class="input input-bordered w-full bg-transparent dark:text-white"
		required
		bind:value={user.paypalEmail}
		placeholder="PayPal Email"
	/>
</div>
{/if}
