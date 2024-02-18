<script lang="ts">
	import { Constants, getDescription, getOgImage } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte';

	
	$: title = "Privacy Policy | DHUB Education"
	$: description = getDescription('The Privacy Policy of DHUB Education')
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
		subline: ['This is the Privacy Policy for Dhub Education'],
		title: 'Privacy Policy'
	}}
/>

<section class="acenter flex flex-col gap-4" aria-label="privacy">
	<p>
		At Dhub Education, we are committed to protecting the privacy of our members, donors, partners,
		and all visitors to our website. We respect your privacy and we are committed to safeguarding
		any personal information that we collect from you. This policy outlines how we collect, use,
		store, and disclose your personal information.
	</p>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Collection of Personal Information</h2>
		<p>
			We may collect personal information from you when you interact with us, such as when you
			attend our events, make a donation, or sign up to receive our newsletters. This information
			may include your name, address, email address, phone number, and other details that you
			voluntarily provide.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Use of Personal Information</h2>
		<p>
			We may use your personal information to communicate with you about our ministry, programs, and
			outreaches. We may also use your information to process donations and to provide you with
			receipts and other information related to your donations. Additionally, we may use your
			information for administrative purposes, such as maintaining our database and analyzing our
			ministry's effectiveness.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Disclosure of Personal Information</h2>
		<p>
			We do not share, sell, or otherwise disclose your personal information to third parties except
			as required by law or as necessary to fulfill our ministry's purposes. For example, we may
			share your information with our trusted partners who assist us in processing donations,
			sending newsletters, or analyzing our ministry's effectiveness.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Data Security</h2>
		<p>
			We take reasonable measures to protect the security of your personal information and to
			prevent unauthorized access, disclosure, or modification. However, no data transmission over
			the internet or other network can be guaranteed to be 100% secure. Therefore, while we strive
			to protect your personal information, we cannot guarantee its absolute security.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Changes to this Privacy Policy</h2>
		<p>
			We reserve the right to update or modify this privacy policy at any time without prior notice.
			Your continued use of our website and services constitutes your agreement to this policy and
			any updates or modifications.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Contact Information</h2>
		<p>
			<span
				>If you have any questions or concerns about this privacy policy, please contact us at
			</span>
			<strong>dhubeducation@gmail.com</strong>
		</p>
	</div>
</section>
