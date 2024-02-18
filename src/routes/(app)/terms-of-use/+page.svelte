<script lang="ts">
	import { Constants, getDescription, getOgImage } from '$lib';
	import Hero from '$lib/components/partials/Hero.svelte'; 
	
	$: title = "Terms of Use | DHUB Education"
	$: description = getDescription('DHUB Education Terms of Use')
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
		subline: ['This is the Terms of Use for Dhub Education'],
		title: 'Terms of Use'
	}}
/>

<section class="acenter flex flex-col gap-4" aria-label="terms of use">
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Acceptance of Terms</h2>
		<p>
			By accessing or using this website ("Site"), you agree to comply with and be bound by these
			Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Changes to Terms</h2>
		<p>
			We reserve the right to modify or update these Terms at any time without prior notice. Your
			continued use of the Site constitutes acceptance of the revised Terms.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Use of Content</h2>
		<p>
			All content on this Site, including text, images, graphics, and other materials ("Content"),
			is owned by or licensed to us. You may not reproduce, distribute, modify, or use any Content
			without our express written consent.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">User Conduct</h2>
		<p>
			You agree not to use the Site in any way that is unlawful, harmful, or in violation of these
			Terms. You are solely responsible for your actions and any content you post on the Site.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Privacy Policy</h2>
		<p>
			Your use of the Site is also governed by our <a href="/privacy-policy">Privacy Policy</a>. By
			using the Site, you consent to the collection and use of your information as described in the
			Privacy Policy.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Links to Third Party Sites</h2>
		<p>
			The Site may contain links to third-party websites or resources. We are not responsible for
			the content or privacy practices of these sites and encourage you to review their terms and
			policies.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Disclaimer of Warranties</h2>
		<p>
			The Site is provided "as is" without any warranties of any kind, either express or implied,
			including but not limited to warranties of merchantability, fitness for a particular purpose,
			or non-infringement.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Limitation of Liabilities</h2>
		<p>
			We shall not be liable for any indirect, incidental, special, or consequential damages arising
			out of or in connection with your use or inability to use the Site.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Governing Law</h2>
		<p>
			These Terms shall be governed by and construed in accordance with the laws of the United
			Kingdom, without regard to its conflict of law principles.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="sub-title">Contact Information</h2>
		<p>
			If you have any questions or concerns regarding these Terms, please contact us at
			dhubeducation@gmail.com
		</p>
	</div>
</section>
