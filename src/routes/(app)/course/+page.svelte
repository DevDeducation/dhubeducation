<script lang="ts">
	import { Constants, getDescription, getOgImage, utils } from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { browser } from '$app/environment';

	const years = utils.num2List(5).map((idx) => new Date().getFullYear() + idx);

  let documents: string[] = []

	export let form: ActionData

  $: {
		if (browser && form) {
			window.open(JSON.parse(form.payload))
		}
	}
	
	$: title = "Course | DHUB Education"
	$: description = getDescription('Travel Agent Operations and Management Course')
	$: ogimage = getOgImage('/images/course-banner.webp')
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

<div class="form">
	<section class="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
		<img src="/images/course-banner.webp" class="w-full rounded-lg" alt="course banner"/>
		<form
			id="course"
			action="?/course"
			class="mx-auto md:pb-4 md:max-w-2xl bg-white/90 dark:bg-dark-800/90 shadow-custom rounded-lg overflow-hidden flex flex-col items-center"
			enctype="multipart/form-data"
			method="post" use:enhance>
			<div aria-label="form-fields" class="flex flex-col p-4 gap-4 w-full text-center">
				<div class="w-full">
					<h1 class="title">Enquiry form</h1>
					<p>Submit your questions and we will respond to it as soon as possible</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input
						type="text"
						name="name"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="name"
						required
						placeholder="Name"
					/>

					<input
						type="text"
						name="surname"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="surname"
						required
						placeholder="Surname"
					/>

					<input
						type="number"
						name="phoneNumber"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="phoneNumber"
						required
						placeholder="Phone Number"
					/>

					<input
						type="text"
						name="email"
						class="input input-bordered w-full bg-transparent dark:text-white"
						id="email"
						required
						placeholder="Email address"
					/>

					<select
						class="select select-bordered w-full bg-transparent dark:text-white"
						name="countryOfInterest"
						required
					>
						<option disabled selected>Country of Interest</option>
						<option class="dark:text-font" value="United States of America"
							>USA (For UK students)</option>
						<option class="dark:text-font" value="Malta">Malta</option>
						<option class="dark:text-font" value="France (Paris)">France (Paris)</option>
						<option class="dark:text-font" value="United Kingdom">United Kingdom</option>
						<option class="dark:text-font" value="Netherland">Netherland</option>
						<option class="dark:text-font" value="Canada">Canada</option>
					</select>

					<select
						class="select select-bordered w-full bg-transparent dark:text-white"
						name="levelOfStudy"
						required>
						<option disabled selected>Level of Study</option>
						<option class="dark:text-font" value="A-Level">A-Level</option>
						<option class="dark:text-font" value="Foundation">Foundation</option>
						<option class="dark:text-font" value="OND">OND</option>
						<option class="dark:text-font" value="HND">HND</option>
						<option class="dark:text-font" value="Top Up">Top Up</option>
						<option class="dark:text-font" value="BSc.">BSc.</option>
						<option class="dark:text-font" value="Pre-MSc.">Pre-MSc.</option>
						<option class="dark:text-font" value="MSc.">MSc.</option>
						<option class="dark:text-font" value="PhD.">PhD.</option>
					</select>
					<select
						class="select select-bordered w-full bg-transparent dark:text-white"
						name="yearOfEntry"
						required>
						<option disabled selected>Year of Entry</option>
						{#each years as year, i}
							<option class="dark:text-font" value={year}>{year}</option>
						{/each}
					</select>
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
				</fieldset>
				<textarea
					required
					name="note"
					id="note"
					class="textarea textarea-bordered w-full bg-transparent dark:text-white"
					rows="4"
					placeholder="Please enter your enquiry here..."
				/>
			</div>
			<Button
				options={{
					dataname: 'enquiry btn',
					isAnchorLink: false,
					btnType: 'submit',
					text: 'submit',
					padding: 'py-3 px-6'
				}}
			/>
		</form>
	</section>
</div>

<style>
	#note {
		resize: none;
	}
</style>
