<script lang="ts">
	import { Constants, countrylist, educationlist, getDescription, getOgImage, utils } from '$lib';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { browser } from '$app/environment';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import Selectlist from '$lib/components/widgets/Selectlist.svelte';
	import Checkbox from '$lib/components/widgets/Checkbox.svelte';

	const years = utils.num2List(5).map((idx) => new Date().getFullYear() + idx);

	let yearlist = years.map(year => ({ label: year.toString(), value: year.toString() }))

  let documents: string[] = []

	export let form: ActionData

  $: {
		if (browser && form) {
			window.open(JSON.parse(form.payload))
		}
	}
	
	$: title = "Enquiry | DHUB Education"
	$: description = getDescription('Reachout to us for further enquiries')
	$: ogimage = getOgImage(Constants.BACKGROUND_IMAGE)
</script>


<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}" />
	
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{ogimage}" />

  <!-- Twitter -->
  <meta property="twitter:title" content="{title}" />
  <meta property="twitter:description" content="{description}" />
  <meta property="twitter:image" content="{ogimage}" />
</svelte:head>

<div>
	<section class="py-4 acenter">
		<form
			id="enquiry"
			action="?/enquiry"
			class="mx-auto md:pb-4 md:max-w-2xl shadow-custom rounded-lg overflow-hidden flex flex-col items-center py-4"
			enctype="multipart/form-data"
			method="post" use:enhance>
			<div aria-label="form-fields" class="flex flex-col p-4 gap-4 w-full text-center">
				<div class="w-full">
					<h1 class="title">Enquiry form</h1>
					<p>Submit your questions and we will respond to it as soon as possible</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						type="text"
						name="name"
						class="!border !border-muted dark:bg-transparent"
						id="name"
						required
						placeholder="Name"
					/>

					<Input
						type="text"
						name="surname"
						class="!border !border-muted dark:bg-transparent"
						id="surname"
						required
						placeholder="Surname"
					/>

					<Input
						type="number"
						name="phoneNumber"
						class="!border !border-muted dark:bg-transparent"
						id="phoneNumber"
						required
						placeholder="Phone Number"
					/>

					<Input
						type="text"
						name="email"
						class="!border !border-muted dark:bg-transparent"
						id="email"
						required
						placeholder="Email address"
					/>

					<Selectlist list={countrylist} name="countryOfInterest" label="Country of Interest" />
					<Selectlist list={educationlist} name="levelOfStudy" label="Level of Study" />
					<Selectlist list={yearlist} name="yearOfEntry" label="Year of Entry" />
				</div>

				<fieldset class="grid grid-cols-1 md:grid-cols-2 w-full">
					<legend>Which document(s) do you have?</legend>
          <input type="text" name="documents" hidden bind:value={documents}/>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="WAEC"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">WAEC</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="International Passport"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">International Passport</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="Transcript"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">Transcript</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="Certificate"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">Certificate</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="Work Reference"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">Work Reference</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer flex gap-4 justify-start">
							<input
								type="checkbox"
								data-name="document"
                bind:group={documents}
								value="SOP"
								class="checkbox checkbox-secondary border-primary dark:border-white"
							/>
							<span class="label-text text-font dark:text-white">SOP</span>
						</label>
					</div>
					<!-- <Checkbox /> -->
				</fieldset>
				<Textarea
					required
					name="note" 
					class="resize-none !border !border-muted dark:bg-transparent" 
					placeholder="Please enter your enquiry here..."
				/>
			</div>
			<Button type="submit" class="text-white">
				Submit
			</Button>
		</form>
	</section>
</div> 