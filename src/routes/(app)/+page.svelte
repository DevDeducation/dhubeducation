<script lang="ts">
	import {
		dkmap,
		mbmap1,
		mbmap2,
		type iSlide,
		type iService,
		utils,
		Collection,
		uxbridgeCollege1,
		handleClick,
		type iGlobalScale,
		Constants,
		getOgImage,
		getDescription,

		type iSlider

	} from '$lib';
	import Button from '$lib/components/buttons/Button.svelte';
	import YouTubeRed from '$lib/components/icons/YouTubeRed.svelte';
	import Affiliatecard from '$lib/components/cards/Affiliatecard.svelte';
	import Servicecard from '$lib/components/cards/Servicecard.svelte';
	import { onMount } from 'svelte';
	import Blogcard from '$lib/components/cards/Blogcard.svelte';
	import Globalscalecard from '$lib/components/cards/Globalscalecard.svelte';
	import SkeletonPartnercard from '$lib/components/skeletons/SkeletonPartnercard.svelte';
	import Partnercard from '$lib/components/cards/Partnercard.svelte';
	import SkeletonAffiliatecard from '$lib/components/skeletons/SkeletonAffiliatecard.svelte';
	import SkeletonServicecard from '$lib/components/skeletons/SkeletonServicecard.svelte';
	import Slides from '$lib/components/slides/Slides.svelte';
	import ImagePlaceholder from '$lib/components/skeletons/ImagePlaceholder.svelte';
	import Coursecard from '$lib/components/cards/Coursecard.svelte';
	import Carousel from '$lib/components/widgets/review-carousel/Carousel.svelte';
	import { reviews } from '$lib';
	import RegistrationForm from '$lib/components/forms/RegistrationForm.svelte';
	import type { PageLoad } from './$types';

	export let data: PageLoad;
	
	// @ts-ignore
	const sliders: iSlider[] = data.sliders as iSlider[]


	let slides: iSlide[] = [];
	let services: iService[] = [];
	let globalscales: iGlobalScale[] = [
		{
			num: 3000,
			text: 'applications'
		},
		{
			num: 2600,
			text: 'admissions'
		},
		{
			num: 2200,
			text: 'visas'
		},
		{
			num: 10,
			text: 'countries'
		}
	];

	$: {
		slides = slides;
		services = services;
	}

	onMount(async () => {
		slides = await utils.getList(Collection.SLIDES);
		services = await utils.getList(Collection.SERVICES);
	});

	$: title = 'DHUB Education';
	$: description = getDescription('DHUB Education');
	$: ogimage = getOgImage(Constants.BACKGROUND_IMAGE);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogimage} />

	<!-- Twitter -->
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogimage} />
</svelte:head>

<section>
	<div class="md:acenter">
		<Slides {sliders} />
	</div>
</section>

<!-- slides section -->
<section aria-label="intro" class="bg-body-darker dark:dark:bg-dark-900">
	<div class="acenter">
		<h2 class="text-xl font-semibold capitalize title text-center my-4">Sign up for January Application</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="aspect-video rounded-lg" style={`background: url(https://www.dhubeducation.com/images/january-application.webp) no-repeat;background-size:cover;background-position:center`} />
 			<RegistrationForm />
		</div>
	</div>
</section>

<!-- slides section -->
<section aria-label="intro" class="row">
	<div class="acenter">
		<h2 class="text-xl font-semibold capitalize title text-center my-4">What our clients are saying on Google?</h2>
		<Carousel { reviews } />
	</div>
</section>


<!-- global scale section -->
<section class="bg-body-darker dark:dark:bg-dark-900">
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center acenter place-items-center">
		{#each globalscales as options, i}
			<Globalscalecard {options} />
		{/each}
	</div>
</section>

<!-- slides section -->
<section aria-label="intro" class="row">
	<div class="acenter">
		<div class="grid grid-cols-1 lg:rounded-lg relative">
			<div class="flex flex-col gap-4 lg:flex-row items-center lg:items-start bg-white dark:bg-dark-800 rounded-lg p-4 shadow-custom">
				<img
					class="w-32 h-32 rounded-full border-4 border-primary dark:border-white"
					loading="lazy"
					src="/images/ceo.webp"
					alt="ceo"
				/>
				<div class="flex flex-col gap-4">
					<p>
						At Dhub Education, we understand that pursuing higher education in a foreign country
						is not just about academics; it's a journey that shapes your future and broadens your
						horizons. We are dedicated to ensuring that every international student not only
						reaches their dream university but also thrives in their new home, whether it's in the
						UK, Canada, Ireland, Malta, Finland, France, or the USA. We are with you every step of
						the way.
					</p>
					<p>
						Our mission is to make the dream of studying abroad a seamless and enriching reality
						for students worldwide. We believe that education knows no borders, and, as such, we
						are committed to providing comprehensive support to every student throughout their
						entire journey.
					</p>
					<h2 class="title mb-0 pb-0 mt-4 uppercase text-xl text-center lg:text-left">
						what sets us apart
					</h2>
					<p>
						<strong>University Guidance</strong>: We don't just help you find any university; we
						assist in finding the right one for you. Our experienced consultants work closely with
						you to understand your academic goals, preferences, and aspirations, guiding you
						toward institutions that align with your unique needs.
					</p>
					<p>
						<strong>Beyond Academics</strong>: Education is more than just books and classrooms.
						That's why we go the extra mile by providing extensive city guides, helping you
						acclimate to your new surroundings, and making the most of your cultural experience.
					</p>
					<p>
						<strong>Financial Support</strong>: We believe that finances should never be a barrier
						to education. Our team assists you in exploring tuition fee loan options, ensuring
						that you can focus on your studies without the burden of financial stress.
					</p>
					<p>
						<strong>Visa Assistance</strong>: Your journey doesn't end with graduation. We provide
						job placement assistance, connecting you with opportunities to kick-start your career
						in your host country.
					</p>
					<h2>Comprehensive Arrival and Accommodation Services</h2>
					<p>
						<strong>Career Support</strong>: We understand that your journey is not just about
						studying; it's about building a future. Our support extends beyond graduation, helping
						you navigate settlement and immigration processes
					</p>
					<p>
						<strong>One-Year Subscription</strong>: To ensure ongoing success, we provide a
						one-year subscription to exclusive resources and support services. Whether you need
						academic assistance, career advice, or cultural insights, we're here for you
						throughout your first year abroad.
					</p>
					<Button
						options={{
							href: '/about-us',
							text: 'learn more',
							isAnchorLink: true,
							padding: 'py-3 px-6'
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- courses section -->
<section aria-label="courses" class="row bg-body-darker dark:dark:bg-dark-900" id="courses">
	<div class="acenter flex flex-col gap-6 items-center text-center">
		<div>
			<h2 aria-label="courses title" class="text-xl font-semibold uppercase title">
				our courses
			</h2>
			<p>improve your employability and enhance your career prospects.</p>
		</div>
		<div class="card-grid-3 text-center">
			{#await utils.getList(Collection.COURSES)}
				{#each [1, 2, 3] as _, i}
					<SkeletonServicecard />
				{/each}
			{:then value}
				{#each value.slice(0,3) as course, i}
					<Coursecard {course} />
				{/each}
			{/await}
		</div>
		<Button
			options={{
				href: '/courses',
				text: 'all courses',
				isAnchorLink: true,
				padding: 'py-3 px-6',
				otherclasses: 'text-center'
			}}
		/>
	</div>
</section>

<!-- school map section -->
<section aria-label="map" class="row">
	<div class="acenter flex flex-col gap-2">
		<!-- <HomepageMap schools={allSchools} client:only /> -->

		<img
			src={dkmap}
			class="aspect-[1600/618] object-cover shadow-custom w-full hidden md:block rounded-lg"
			alt="desktop map"
		/>
		<img
			src={mbmap1}
			class="aspect-[533/618] object-cover shadow-custom w-full block md:hidden rounded-lg"
			alt="mobile map"
		/>
		<img
			src={mbmap2}
			class="aspect-[533/618] object-cover shadow-custom w-full block md:hidden rounded-lg"
			alt="mobile map"
		/>
	</div>
</section>

<!-- services section -->
<section aria-label="services" class="row bg-body-darker dark:dark:bg-dark-900" id="services">
	<div class="acenter flex flex-col gap-6 items-center text-center">
		<div>
			<h2 aria-label="services title" class="text-xl font-semibold uppercase title">
				our services
			</h2>
			<p>Explore our tailored solutions for your educational journey!</p>
		</div>
		<div class="card-grid-3 text-center">
			{#await utils.getList(Collection.SERVICES)}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonServicecard />
				{/each}
			{:then value}
				{#each value as service, i}
					<Servicecard {service} />
				{/each}
			{/await}
		</div>
		<Button
			options={{
				href: '/services',
				text: 'all services',
				isAnchorLink: true,
				padding: 'py-3 px-6',
				otherclasses: 'text-center'
			}}
		/>
	</div>
</section>

<!-- affiliates container -->
<section aria-label="affiliate" class="row" id="affiliate">
	<div class="acenter flex flex-col gap-6 items-center text-center">
		<div>
			<h2 aria-label="blog title" class="text-xl font-semibold uppercase title">
				Affiliate Program
			</h2>
			<p>Study! Refer!! and Earn!!!</p>
		</div>
		<div class="card-grid-3 text-center">
			{#await utils.getList(Collection.AFFILIATES)}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonAffiliatecard />
				{/each}
			{:then value}
				{#each value as affiliate, i}
					<Affiliatecard {affiliate} />
				{/each}
			{/await}
		</div>
	</div>
</section>

<!-- partners container -->
<section aria-label="affiliate" class="row bg-body-darker dark:dark:bg-dark-900" id="affiliate">
	<div class="acenter flex flex-col gap-6 items-center text-center">
		<div>
			<h2 aria-label="blog title" class="text-xl font-semibold uppercase title">
				Official Partners
			</h2>
			<p>Uxbridge College</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<button class="relative flex items-center justify-center" on:click={handleClick}>
				<span
					class="clickable"
					data-name="play-video"
					data-media={JSON.stringify(uxbridgeCollege1)}
				/>
				<YouTubeRed
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 fill-white"
				/>
				<img
					src={utils.youTubeThumbnail(uxbridgeCollege1.src)}
					class="w-full object-cover aspect-video rounded-lg"
					alt={uxbridgeCollege1.header}
				/>
			</button>
			<div class="text-left flex flex-col gap-2 justify-between">
				<p>
					Thousands of young people and adults from across the world pass through our doors every
					year. Whether you want to train for a career or take the next step towards university, we
					offer a wide range of courses up to degree levels at our campuses in Uxbridge and Hayes.
					We also collaborate with businesses to provide apprenticeships across various industries.
					We have made substantial investments in excellent teaching spaces, areas where you can
					work and exchange ideas with fellow students, and communal facilities for relaxation and
					enjoying a well-earned break during your studies.
				</p>

				<Button
					options={{
						href: '/partners/uxbridge-college',
						text: 'know more',
						isAnchorLink: true,
						padding: 'py-3 px-6',
						otherclasses: 'text-center'
					}}
				/>
			</div>
		</div>
		<div class="card-grid-3 text-center">
			{#await utils.getList(Collection.PARTNERS)}
				{#each [1, 2, 3, 4] as _, i}
					<SkeletonPartnercard small={true} />
				{/each}
			{:then value}
				{#each value.slice(0,3) as partner, i}
					<Partnercard small={true} {partner} />
				{/each}
			{/await} 
		</div>
		<Button
			options={{
				href: '/partners',
				text: 'all partners',
				isAnchorLink: true,
				padding: 'py-3 px-6',
				otherclasses: 'text-center'
			}}
		/>
	</div>
</section>

<!-- blog container -->
<section aria-label="blog" class="row" id="affiliate">
	<div class="acenter flex flex-col gap-6 items-center text-center">
		<div>
			<h2 aria-label="blog title" class="text-xl font-semibold uppercase title">Blog</h2>
			<p>Navigate the path to educational excellence through our blog posts</p>
		</div>
		<div class="card-grid-3">
			{#await utils.getList(Collection.BLOG)}
				<!-- promise is pending -->
			{:then value}
				{#each value.slice(0, 3) as blog, i}
					<Blogcard {blog} title="read post" />
				{/each}
			{/await}
		</div>
		<Button
			options={{
				href: '/blog',
				text: 'read all posts',
				isAnchorLink: true,
				padding: 'py-3 px-6',
				otherclasses: 'text-center'
			}}
		/>
	</div>
</section>
