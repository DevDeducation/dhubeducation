<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Classes } from "$lib/constants";
	import { alertstore, utilsstore } from "$lib/stores/utilsstore";
	import { handleClick } from "$lib/utils/index";
	import CloseBtn from "../buttons/CloseBtn.svelte";
	import Followuslinks from "./Followuslinks.svelte";
	import RegistrationForm from '../forms/RegistrationForm.svelte';
	import Countdown from '../widgets/Countdown.svelte';
	import Input from '../ui/input/input.svelte';

  let email: string = ""
  let nlFormRef: HTMLFormElement
  let modalRef: HTMLElement

  const handleSubmit = async (evt: SubmitEvent) => {
    evt.preventDefault()
    const formData = new FormData(nlFormRef)
    const button = evt.submitter as HTMLElement
    const entries = Object.fromEntries(formData.entries())
    button.classList.add(Classes.LOADING)
    
    console.log("before firing")
    try {
      console.log("fired")
      const res = await fetch('/api/newsletter', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries)
      }) 
      const data = await res.json() 
      button.classList.remove(Classes.LOADING)
      $utilsstore.setAlert(data.message, data.status, alertstore)
      modalRef.classList.add(Classes.HIDDEN)
    } catch (error: any) { 
      button.classList.remove(Classes.LOADING)
      $utilsstore.setAlert(error.message, "error", alertstore) 
    }
  }

  const handlePopupClick = (evt: Event) => {
    $utilsstore.resetAudioAndVideo().hideMedia().setPopupStamp()
    goto("/affiliate-program")
  }
  
</script>
<section id="modal" aria-label="modal" class="fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[32] origin-center flex hidden justify-center items-center" data-key="modal" bind:this={modalRef}>
  <button on:click={handleClick} data-name="modal overlay" class="opacity-75 bg-black absolute w-full h-full"></button>
  <div data-name="modal content" class="absolute bg-white dark:bg-dark-900 text-current p-4 rounded-lg gap-4 origin-center w-[calc(100%-16px)] max-w-[768px] flex flex-col">
    <div class="flex justify-between items-center">
      <h2 data-name="modal-header" class="font-semibold">
        Header
      </h2>
      <CloseBtn on:click={handleClick} />
    </div>
    <div data-name="modal-content">
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="latest message"
        loading="lazy"
        class="w-full rounded-sm4 aspect-video hidden" src="" id="videoPopup"></iframe>
      <audio class="w-full hidden" controls data-title="" data-audiourl="" id="audioPopup">
        <source src="" type="audio/mpeg">
        Your browser does not support the audio element. 
      </audio>
      <div class="grid grid-cols-1">
        <div class="w-full img flex flex-col gap-2" id="bannerPopup">
          <!-- <Followuslinks /> -->
          <!-- <Countdown /> -->
          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a href="https://us06web.zoom.us/j/85423523567?pwd=MlqqSV3b6gjulr3iQ0g02TmU7qEzbg.1" class="relative w-full h-full">
              <img class="w-full aspect-video" src="" alt="popup"/>
            </a>
            <div class="flex flex-col gap-1">
              <div>
                <h2 class="font-semibold text-white">Thursday May 23, 2024</h2>
                <p class="text-muted-foreground">Time: 12pm - 4pm WAT</p>
                <p class="text-muted-foreground">Meeting ID: 854 2352 3567</p>
                <p class="text-muted-foreground">Passcode: 979940</p>
              </div>
              <div>
                <h2 class="font-semibold text-white">Friday May 24, 2024</h2>
                <p class="text-muted-foreground">Time: 5pm - 8pm WAT</p>
                <p class="text-muted-foreground">Meeting ID: 854 2352 3567</p>
                <p class="text-muted-foreground">Passcode: 979940</p>
              </div>
              <Button href="https://us06web.zoom.us/j/85423523567?pwd=MlqqSV3b6gjulr3iQ0g02TmU7qEzbg.1" class="text-white">JOIN NOW</Button>
            </div>
          </div> -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a href="/#" class="relative w-full h-full">
              <img class="w-full aspect-auto" src="" alt="popup"/>
            </a>
            <RegistrationForm />
          </div>
          <!-- <a href="/#" class="relative w-full h-full">
            <img class="w-full aspect-video" src="" alt="popup"/>
          </a> -->
        </div>
        <!-- <div class="relative flex flex-col gap-4" id="newsletterPopup">
          <img src="/images/newsletter-bg.webp" class="w-full" alt="newsletter" />
          <form
            class=" md:pb-4 shadow-custom rounded-lg flex flex-col md:flex-row items-center gap-4 w-full md:w-[calc(100%-32px)] text-center md:absolute md:bottom-1 md:left-1/2 md:-translate-x-1/2"
            enctype="multipart/form-data"
            bind:this={nlFormRef}
            on:submit={handleSubmit}
            method="post">
            <Input 
            type="email"
            name="email"
            class="input input-bordered w-full bg-transparent text-white"
            id="email" 
            required
            bind:value={email}
            placeholder="Email address"/>
            <Button type="submit" class="w-full md:w-fit dark:bg-white dark:text-primary bg-primary text-white">subscribe</Button>
          </form>
        </div> -->
      </div>
    </div>
    <!-- <div data-name="modal-footer">
      Footer
    </div> -->
  </div>
</section>