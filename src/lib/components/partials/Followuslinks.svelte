<script lang="ts">
	import Button from './../ui/button/button.svelte';
	import LinkedIn from './../icons/LinkedIn.svelte';
	import WhatsApp from './../icons/WhatsApp.svelte';
	import YouTube from './../icons/YouTube.svelte';
	import Instagram from './../icons/Instagram.svelte';
	import Facebook from './../icons/Facebook.svelte';
	import Twitter from './../icons/Twitter.svelte';
  import TikTok from '../icons/TikTok.svelte';
  import { links } from "$lib/utils/index";
	import Telegram from '../icons/Telegram.svelte';
	import { Constants } from '$lib';

  const icon = (name: string) => {
    switch (name) {
      case Constants.TWITTER: return Twitter;
      case Constants.FACEBOOK: return Facebook;
      case Constants.INSTAGRAM: return Instagram;
      case Constants.YOUTUBE: return YouTube;
      case Constants.TELEGRAM: return Telegram;
      case Constants.WHATSAPP: return WhatsApp;
      case Constants.LINKEDIN: return LinkedIn;
      case Constants.TIKTOK: return TikTok
    }
  }

  let dynamicComponent
</script>

<div class="flex justify-between md:justify-start gap-2 items-center">
  {#each links.followus.submenu as menu, i}
    <Button class="!p-0 !m-0">
      <a href={menu.url} target="_blank" class="w-10 h-10 flex items-center justify-center dark:bg-white text-white dark:text-primary rounded-lg" aria-label={menu.name}>
        <svelte:component this={icon(menu.name)}></svelte:component>
      </a>
    </Button>
  {/each}
</div>