<script lang="ts">

	import CloseMobileNav from "../buttons/CloseMobileNav.svelte";
	import Darkmode from "../buttons/Darkmode.svelte";
  import { navigating, page } from "$app/stores";
	import type { iSession } from "$lib/interfaces";
  import Button from "$lib/components/buttons/Button.svelte"
	import { logout } from "$lib/firebase/client";
	import { onDestroy, onMount } from "svelte";
  import { utilsstore } from "$lib/stores/utilsstore";
	import { Constants, Events } from "$lib/constants";
	import Grid from "../icons/Grid.svelte";
	import Profile from "../icons/Profile.svelte";
	import List from "../icons/List.svelte";
	import Home from "../icons/Home.svelte";
	import About from "../icons/About.svelte";
	import Service from "../icons/Service.svelte";
	import Affiliate from "../icons/Affiliate.svelte";
	import Finance from "../icons/Finance.svelte";
  import { Plane } from "lucide-svelte"
	import Blog from "../icons/Blog.svelte";
	import Course from "../icons/Course.svelte";

  let mobileNavRef: HTMLElement

  const session: iSession = $page.data.userSession

  const handleCloseMobileNav = (evt: Event) => {
    const target = evt.target as HTMLElement
    const isClickable = target.classList.contains(Constants.CLICKABLE)

    isClickable && $utilsstore.toggleMobileNav()
  }
  
  onMount(() => {
    mobileNavRef && mobileNavRef.addEventListener(Events.CLICK, handleCloseMobileNav)
  })

  onDestroy(() => {
    mobileNavRef && mobileNavRef.removeEventListener(Events.CLICK, handleCloseMobileNav)
  })
</script>

<div class="bg-gray-200 dark:bg-dark-800 -mobile-navigation transition-transform duration-200 ease-in-out" data-type="mobile navigation">
  <div class="-content relative">
    <div class="-top -hide-back-bt">
      <Darkmode /> 
      <CloseMobileNav />
    </div>

    <div class="absolute active transition-transform duration-200 ease-in-out flex flex-col w-full h-[calc(100%-72px)] overflow-auto" bind:this={mobileNavRef}>
      <a href="/" data-type="menu" aria-label="home" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Home />
        <span>home</span>
      </a>
      <a href="/about-us" data-type="menu" aria-label="about" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <About />
        <span>about</span>
      </a>
      <a href="/services" data-type="menu" aria-label="service" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Service />
        <span>services</span>
      </a>
      <a href="/courses" data-type="menu" aria-label="finance" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Course />
        <span>courses</span>
      </a>
      <a href="/affiliate-program" data-type="menu" aria-label="affiliate program" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Affiliate />
        <span>affiliate program</span>
      </a>
      <a href="/finance" data-type="menu" aria-label="finance" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Finance />
        <span>finance</span>
      </a>
      <a href="/blog" data-type="menu" aria-label="referral" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
        <span class="clickable"></span>
        <Blog />
        <span>blog</span>
      </a>
      <hr class="opacity-20"/>
      {#if session}
        <a href="/affiliate" data-type="menu" aria-label="affiliate" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
          <span class="clickable"></span>
          <Grid />
          <span>dashboard</span>
        </a>
        <a href="/profile" data-type="menu" aria-label="profile" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
          <span class="clickable"></span>
          <Profile />
          <span>profile</span>
        </a>
        <a href="/referral" data-type="menu" aria-label="referral" rel="prefetch" class="flex items-center gap-2  border-b-dark-800/20 dark:border-b-white/20 p-4 capitalize font-semibold relative">
          <span class="clickable"></span>
          <List />
          <span>referral</span>
        </a>
        <div class="px-4 mb-2">
          <Button
          on:click={logout}
          options={{
            isAnchorLink: false,
            text: "Signout",
            btnType: "button",
            height: "h-[32px]",
            padding: "py-6",
            otherclasses: "flex justify-center items-center"
          }} />
        </div>
      {/if}
      <div class="px-4 mt-2">
        <Button options={{
          isAnchorLink: true,
          text: "Enquiry",
          href: "/enquiry",
          height: "h-[32px]",
          padding: "py-6",
          otherclasses: "flex justify-center items-center"
        }} />
      </div>
    </div>
  </div>
</div>