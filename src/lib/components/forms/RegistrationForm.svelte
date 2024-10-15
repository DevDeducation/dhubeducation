<script lang="ts">
	import { enhance } from '$app/forms';
	import { Classes, handleClick, type iStatus } from '$lib';
	// import toast from "svelte-french-toast";
	import { toast } from 'svelte-sonner';
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';
	import { Select } from '../ui/select';
	import Countdown from '../widgets/Countdown.svelte';

	let formRef: HTMLFormElement;

	const handleSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(formRef);
		const button = evt.submitter as HTMLElement;
		const entries = Object.fromEntries(formData.entries());

		try {
			button.classList.add(Classes.LOADING);
			const options: RequestInit = {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(entries)
			};

			const response = await fetch('/api/registration', options);
			const data = (await response.json()) as iStatus;
			data.status === 'success' ? toast.success(data.message) : toast.error(data.message);
			location.reload()
		} catch (error: any) {
			toast.success(error.message)
		} finally {
			button.classList.remove(Classes.LOADING);
		}

		// handleClick(evt);
	};
</script>

<!-- <Countdown /> -->
<form
	class="flex flex-col items-center gap-4 overflow-hidden rounded-lg bg-white dark:bg-dark-950 p-4"
	bind:this={formRef}
	on:submit={handleSubmit}
>
	<h1>Fill the form below to register</h1>
	<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
		<input
			type="text"
			name="name"
			class="!hidden"
			id="name"
			required
			value="application"
			placeholder="Name"
		/>
		<Input
			type="text"
			name="fullname"
			class="!border !border-muted dark:bg-transparent"
			id="fullname"
			required
			placeholder="Full name"
		/>
		<Input
			type="text"
			name="country"
			class="!border !border-muted dark:bg-transparent"
			id="country"
			required
			placeholder="Country"
		/>
		<Input
			type="email"
			name="email"
			class="!border !border-muted dark:bg-transparent"
			id="email"
			required
			placeholder="Email address"
		/>
		<Input
			type="text"
			name="phoneNumber"
			class="!border !border-muted dark:bg-transparent"
			id="phoneNumber"
			required
			title="Please enter a valid phone number"
			placeholder="Phone Number (e.g 832 310 8276)"
		/>
		<!-- <select
			name="program"
			id=""
			class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground"
		>
			<option value="" selected>Program interest...</option>
			<option value="foundation">Foundation</option>
			<option value="bachelors">Bachelor's</option>
			<option value="masters">Master's</option>
		</select>
		<select
			name="occupation"
			id=""
			class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground"
		>
			<option value="" selected>Occupation...</option>
			<option value="student">Student</option>
			<option value="employed">Employed</option>
			<option value="self-employed">Self Employed</option>
		</select> -->
	</div>
	<Button type="submit" class="text-white">Register</Button>
</form>
