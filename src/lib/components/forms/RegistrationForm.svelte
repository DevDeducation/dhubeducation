<script lang="ts">
	import { enhance } from "$app/forms";
	import { Classes, handleClick, type iStatus } from "$lib";
	import toast from "svelte-french-toast";
	import { Button } from "../ui/button";
  import { Input } from "../ui/input";

  
  let formRef: HTMLFormElement

  const handleSubmit = async (evt: SubmitEvent) => {
    evt.preventDefault()
    const formData = new FormData(formRef)
    const button = evt.submitter as HTMLElement
    const entries = Object.fromEntries(formData.entries())
    button.classList.add(Classes.LOADING)
    
    const promise = fetch('/api/registration', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries)
    }) 

		const response = await toast.promise(promise, {
			loading: 'Submitting...',
			success: 'Submitted successfully.',
			error: 'Could not submit.'
		});

    const data = await response.json() as iStatus;
    data.status === "success" ? toast.success(data.message) : toast.error(data.message)
		handleClick(evt)
  }
</script>

<form
	class="flex flex-col items-center gap-4 overflow-hidden rounded-lg shadow-custom"
  bind:this={formRef}
  on:submit={handleSubmit}>
	<h1>Fill the form below to register</h1>
	<div class="flex w-full flex-col gap-4 md:flex-row">
		<input
			type="text"
			name="name"
			class="!hidden"
			id="name"
			required
			value="Virtual Fair 2024"
			placeholder="Name"
		/>
		<Input
			type="text"
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
			placeholder="Phone Number (e.g +1 832 310 8276)"
		/>
	</div>
	<Button type="submit" class="text-white">Register</Button>
</form>
