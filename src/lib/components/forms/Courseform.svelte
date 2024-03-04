<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '../ui/input';
	import Datepicker from '../widgets/Datepicker.svelte';
	import Radiogroup from '../widgets/Radiogroup.svelte';
	import Selectlist from '../widgets/Selectlist.svelte';
	import { Button } from '../ui/button';
	import toast, { Toaster } from 'svelte-french-toast';
	import { educationlist } from '$lib';

	const genderlist = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' }
	];

	const preferredday = [
		{ value: 'weekday evening', label: 'Weekday Evening' },
		{ value: 'weekend afternoon', label: 'Weekend Afternoon' }
	];

	const courseformat = [
		{ value: 'zoom', label: 'Zoom' },
		{ value: 'google meet', label: 'Google Meet' },
		{ value: 'teams', label: 'Teams' }
	];

	const handleSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const target = evt.target as HTMLFormElement;
		const formData = new FormData(target);
		const entries = Object.fromEntries(formData.entries());

		const promise = fetch('/api/course', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(entries)
		});

		const response = await toast.promise(promise, {
			loading: 'Submitting...',
			success: 'Submitted successfully.',
			error: 'Could not submit.'
		});

    const data = await response.json()

    console.log({ data })
	};
</script>

<div class="flex flex-col gap-4">
	<form
		on:submit={handleSubmit}
		method="post"
		action=""
		enctype="multipart/form-data"
		class="flex flex-col gap-4 items-center justify-center w-full max-w-5xl mx-auto"
		use:enhance>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
			<fieldset>
				<legend>Personal Information</legend>
				<div class="flex flex-col gap-2">
					<Input
						name="fullname"
						placeholder="Full name"
						type="text"
						required
						class="!border !border-muted dark:bg-transparent"
					/>
					<Input
						name="email"
						placeholder="Email"
						type="email"
						required
						class="!border !border-muted dark:bg-transparent"
					/>
					<Datepicker label="Date of birth" name="dateofbirth" />
					<Selectlist name="gender" label="Gender" list={genderlist} />
					<Input
						name="country"
						placeholder="Country"
						class="!border !border-muted dark:bg-transparent"
					/>
					<Input name="city" placeholder="City" class="!border !border-muted dark:bg-transparent" />
					<Input
						name="phone"
						placeholder="Phone Number"
						type="text"
						required
						class="!border !border-muted dark:bg-transparent"
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>Educational Background</legend>
				<div class="flex flex-col gap-2">
					<Radiogroup name="education" list={educationlist} />
				</div>
			</fieldset>
			<div class="flex flex-col gap-4">
				<fieldset>
					<legend>Current Employer (If any)</legend>
					<div class="flex flex-col gap-2">
						<Input
							name="employer"
							placeholder="Employer"
							class="!border !border-muted dark:bg-transparent"
						/>
						<Input
							name="jobtitle"
							placeholder="Job Title"
							class="!border !border-muted dark:bg-transparent"
						/>
						<Input
							name="experience"
							type="number"
							placeholder="Years of experience in travel industry"
							class="!border !border-muted dark:bg-transparent"
						/>
					</div>
				</fieldset>
				<fieldset>
					<legend>Course Preferences</legend>
					<div class="flex flex-col gap-2">
						<Selectlist name="day" label="Preferred Day" list={preferredday} />
						<Selectlist name="format" label="Course Format" list={courseformat} />
						<Selectlist name="course" label="Course" list={courseformat} />
					</div>
				</fieldset>
			</div>
		</div>
		<Button type="submit" class="w-full text-white md:w-fit">Submit</Button>
	</form>
	<div class="flex flex-col gap-2">
		<p>
			Please ensure all information provided is accurate and complete. Upon submission, our team
			will review your registration and contact you regarding the next steps.
		</p>
		<p>
			Thank you for choosing our Travel Agent Operations and Management Course. We look forward to
			welcoming you!
		</p>
	</div>
</div>
