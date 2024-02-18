<script lang="ts">
	import { enhance } from "$app/forms";
	import Hero from "$lib/components/partials/Hero.svelte";
	import type { ActionData } from "./$types";
  import { utilsstore, alertstore } from "$lib/stores/utilsstore";
	import Button from "$lib/components/buttons/Button.svelte";
	import { Classes, getDescription, getOgImage, type iHeroLoad } from "$lib";
	import type { PageServerData } from '../$types';
	
	export let data: PageServerData;

	$: heroload = data as unknown as iHeroLoad;
	$: slider = heroload.slider;

  let btnRef: HTMLElement
	export let form: ActionData

  $: {
    if (form) {
      $utilsstore.setAlert(form.message, form.status, alertstore)
      btnRef && btnRef.classList.remove(Classes.LOADING)
    }
  }

  $: handleSubmit = (evt: SubmitEvent) => {
    btnRef.classList.add(Classes.LOADING)
  }


	$: title = "Contact Us | DHUB Education"
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
<section class="bg-body dark:bg-dark-900">
  <div class="p-4 mx-auto max-w-lg w-full">
      <form
        on:submit={handleSubmit}
        action="?/contact"
        class="space-y-4 flex flex-col items-center w-full bg-white dark:bg-dark-800 p-4 rounded-lg shadow-custom"
        enctype="multipart/form-data"
			  method="post" use:enhance>
          <div class="w-full">
              <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="dhubeducation@gmail.com" required>
          </div>
          <div class="w-full">
              <label for="subject" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" name="subject" class="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
          </div>
          <div class="w-full">
              <label for="message" class="block mb-2 font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." name="message"></textarea>
          </div>
          <div class="rounded-lg" bind:this={btnRef}>
            <Button
              options={{
                text: "send message",
                btnType: "submit",
                isAnchorLink: false,
                otherclasses: "w-full sm:w-fit self-center"
              }}
            />
          </div>
      </form>
  </div>
</section>

<style>
  #message {
    resize: none;
  }
</style>