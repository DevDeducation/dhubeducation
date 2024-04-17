<script lang="ts">
	import { getDescription, getOgImage, type iHeroLoad, type iSession } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from '../$types';
	import { Button } from '$lib/components/ui/button';
	
	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

	const handleSubmit = (evt: SubmitEvent) => {
		
	};

	onMount(() => {
		// handling international phone input
	});

	$: title = "Finance | DHUB Education"
	$: description = getDescription(slider.subline)
	$: ogimage = getOgImage(slider.background)
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

<Hero
options={{
	cta: false,
	title: slider.title,
	subline: [slider.subline],
	backgroundImage: slider.background
}}
/>

<div class="acenter p-4 flex flex-col gap-4 items-center">
	<p
		class="mx-auto border-l-4 rounded-lg border-primary dark:border-white shadow-custom bg-white dark:bg-dark-800 p-4">
		At DHub Education, we're dedicated to turning dreams into reality through education. With our flexible finance options, everyone has the opportunity to pursue their studies. Whether you qualify for student finance or need a loan, we're here to support you every step of the way. Don't let financial constraints hold you back from achieving your educational goals. Join us at DHub Education and let's make your dreams come to life together
	</p>

	<p>
		To be eligible for student finance in the UK, you typically need to meet the following requirements:
	</p>

	<ol class="flex flex-col gap-4">
		<li>
			<strong>Residence: </strong>
			<span>You must be a UK national or have settled status (usually residing in the UK for at least three years before the start of the course) or meet specific residency criteria if you are an EU, EEA, or Swiss national.</span>
		</li>
		<li>
			<strong>Course: </strong>
			<span>You must be enrolled in an eligible course at a recognized UK institution. This includes undergraduate and postgraduate courses, as well as certain part-time and distance learning programs.</span>
		</li>
		<li>
			<strong>Personal eligibility: </strong>
			<span>You must be aged under 60 at the start of the academic year for which you are applying. There may be specific age restrictions for certain types of funding.</span>
		</li>
		<li>
			<strong>Previous study: </strong>
			<span>You may be eligible for student finance even if you've studied before or have previous qualifications, but this can affect the amount of funding you receive.</span>
		</li>
		<li>
			<strong>Financial circumstances: </strong>
			<span>You may be eligible for student finance even if you've studied before or have previous qualifications, but this can affect the amount of funding you receive.</span>
		</li>
		<li>
			<strong>Course intensity: </strong>
			<span>If you're studying part-time, you may need to study at a certain intensity (usually at least 25% of the full-time equivalent) to be eligible for student finance.</span>
		</li>
		<li>
			<strong>Nationality or residency status: </strong>
			<span>Different rules may apply if you're an EU, EEA, or Swiss national studying in the UK. Since Brexit, there have been changes to the eligibility criteria for EU, EEA, and Swiss nationals, so it's essential to check the latest guidance.</span>
		</li>
		<li>
			<strong>Guarantor: </strong>
			<span>In some cases, international students may be required to provide a guarantor who is a UK resident or citizen with a stable income and good credit history. The guarantor would be responsible for repaying the loan if you're unable to do so.</span>
		</li>
		<li>
			<strong>Repayment plan: </strong>
			<span>You'll need to demonstrate a feasible plan for repaying the loan, including details of your expected income after graduation and how you intend to manage your finances during your studies and beyond.</span>
		</li>
		<li>
			<strong>Loan terms and conditions: </strong>
			<span>It's essential to carefully review the terms and conditions of the loan, including interest rates, repayment terms, and any fees or penalties associated with the loan.</span>
		</li>
	</ol>
</div>
