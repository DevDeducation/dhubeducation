<script lang="ts">
	import RightArrow from './../icons/RightArrow.svelte';
	import LeftArrow from './../icons/LeftArrow.svelte';
  import { onDestroy, onMount } from "svelte";
	import { Attributes, Events, imgparams, type iSlide } from '$lib';

  export let slidelist: iSlide[]

  let currentSet: iSlide = slidelist[0]

  let slider: HTMLElement;
  let buttons: HTMLElement
  let slides: NodeListOf<Element>
  let prevEl: HTMLElement;
  let nextEl: HTMLElement;
  let interval: any
  
  let current = 0;
  let prev = currentSet.list.length - 1;
  let next = 1;

  const reset = () => {
    current = 0;
    prev = currentSet.list.length - 1;
    next = 1;
    removeClasses()
    addClasses()
    clearInterval(interval)
  }

  const removeClasses = () => {
    slides.forEach(el => {
      el.classList.remove("active")
      el.classList.remove("prev")
      el.classList.remove("next")
    })
  }

  const addClasses = () => {
    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
  }

  const gotoNum = (num: number) => {
    current = num;
    prev = current - 1;
    next = current + 1;

    removeClasses()

    if (next == 5) {
      next = 0;
    }

    if (prev == -1) {
      prev = currentSet.list.length - 1;
    }

    addClasses()
  };

  const handlePrev = () => gotoPrev()
  const handleNext = () => gotoNext()

  const gotoPrev = (by?: string) => {
    !by && clearInterval(interval)
    current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
  }

  const gotoNext = (by?: string) => {
    !by && clearInterval(interval)
    current < (currentSet.list.length - 1) ? gotoNum(current + 1) : gotoNum(0);
  }

  const switchSliders = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement
    const name = target.getAttribute(Attributes.DATANAME)

    const filtered = slidelist.filter(slide => slide.name === name)

    const found = filtered[0]

    currentSet = found ? found : currentSet

    reset()
  }

  onMount(() => {
    slides = document.querySelectorAll(".item");
    prevEl.addEventListener(Events.CLICK, handlePrev);
    nextEl.addEventListener(Events.CLICK, handleNext);
    buttons.addEventListener(Events.CLICK, switchSliders)

    // interval = setInterval(() => gotoNext("interval"), 3000)
  });

  onDestroy(() => {
    prevEl.removeEventListener(Events.CLICK, handlePrev);
    nextEl.removeEventListener(Events.CLICK, handleNext);
    buttons.removeEventListener(Events.CLICK, switchSliders)
  })

  const getClassName = (index: number) => {
    let className = "item"
    switch (index) {
      case 0: className += " active"; break;
      case 1: className += " next"; break
    }
    return className
  }

</script>

<div>
  <div class="wrap h-[300px] relative">
    <div class="items" bind:this={slider}>
      {#each currentSet.list as src, i}
      <div class={getClassName(i)}>
        <img src={`${src}${imgparams}`} alt="slide" />
      </div>
      {/each}
      <div class="button-container">
        <div class="button prev" bind:this={prevEl}>
          <LeftArrow />
        </div>
        <div class="button next" bind:this={nextEl}>
          <RightArrow />
        </div>
      </div>
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="flex overflow-x-auto gap-4 whitespace-nowrap p-4 pt-0" bind:this={buttons} on:click={switchSliders}>
    {#each slidelist as slide, i}
      <button data-name={slide.name} class="py-3 px-4 border-2 border-primary rounded-lg dark:border-white text-primary dark:text-white">
        {`#${i + 1}`}
      </button>
    {/each}
  </div>
</div>

<style>

  .items {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
  }

  .items .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    height: 280px;
    /* border-radius: 50%; */
    overflow: hidden;
    transition: all 300ms ease-in-out;
    z-index: -1;
    opacity: 0;
  }

  .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item.active {
    opacity: 1;
    z-index: 99;
    box-shadow: 0px 0px 105px -35px rgba(0, 0, 0, 0.75);
  }

  .item.prev {
    z-index: 2;
    opacity: 0.25;
    transform: translate(-125%, -50%);
  }

  .item.next {
    z-index: 2;
    opacity: 0.25;
    transform: translate(25%, -50%);
  }

  .items .button-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 275px;
    z-index: 100;
  }

  .button-container .button {
    color: #fff;
    font-size: 32px;
    cursor: pointer;
    position: relative;
    opacity: 0.75;
    transition: all 300ms ease-in-out;
  }

  .button-container .button:hover {
    opacity: 1;
  }

  .button-container .button:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 50%;
    z-index: -99;
  }

  .button-container .button:nth-child(1) {
    float: left;
  }

  .button-container .button:nth-child(2) {
    float: right;
  }
</style>
