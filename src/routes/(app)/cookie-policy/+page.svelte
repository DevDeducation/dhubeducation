<script lang="ts">
	import { Constants, getDescription, getOgImage } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';

	$: title = "Contact Us | DHUB Education"
	$: description = getDescription("Cookie Policy of DHUB Education")
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

<Hero
	options={{
		cta: false,
		height: 'aspect-[320/180] md:h-[315px]',
		subline: ['This is the Cookie Policy for Dhub Education'],
		title: 'Cookie Policy'
	}}
/>

<section class="acenter flex flex-col gap-4" aria-label="cookies">
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">What Are Cookies?</h2>
		<p>
			As is common practice with almost all professional websites, this site uses cookies, which are
			tiny files that are downloaded to your computer, to improve your experience. This page
			describes what information they gather, how we use it, and why we sometimes need to store
			these cookies. We will also share how you can prevent these cookies from being stored,
			however, this may downgrade or 'break' certain elements of the site's functionality.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">How We Use Cookies</h2>
		<p>
			We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there
			are no industry standard options for disabling cookies without completely disabling the
			functionality and features they add to this site. It is recommended that you leave on all
			cookies if you are not sure whether you need them or not, in case they are used to provide a
			service that you use.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Disabling Cookies</h2>
		<p>
			You can prevent the setting of cookies by adjusting the settings on your browser (see your
			browser Help for how to do this). Be aware that disabling cookies will affect the
			functionality of this and many other websites that you visit. Disabling cookies will usually
			result in also disabling certain functionality and features of this site. Therefore, it is
			recommended that you do not disable cookies.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">The Cookies We Set</h2>
		<ul>
			<li>Site preferences cookies</li>
			<li>Third-party cookies</li>
		</ul>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">More Information</h2>
		<p>
			Hopefully, that has clarified things for you, and as was previously mentioned, if there is
			something that you aren't sure whether you need or not, it's usually safer to leave cookies
			enabled in case it does interact with one of the features you use on our site.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Contact Information</h2>
		<p>
			<span
				>If you have any concerns or questions about this cookie policy, feel free to contact us via
				email at [Contact Email Address].
			</span>
			<strong>dhubeducation@gmail.com</strong>
		</p>
	</div>
</section>
